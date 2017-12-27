import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ClassificatorService} from '../service/classificator.service';
import {Element} from '../model/Element';
import {EventService} from '../service/event.service';
import {Actions} from '../service/Actions';
import _ from 'lodash/array';
import {ChangedUrl} from '../model/ChangedUrl';
import {ElementShortInfo} from '../model/ElementShortInfo';
import 'rxjs/add/operator/do';

@Component({
  selector: 'clsf-classificator-tree',
  templateUrl: './classificator-tree.component.html',
  styleUrls: ['./classificator-tree.component.scss']
})
export class ClassificatorTreeComponent implements OnInit, OnDestroy {
  static MAX_NESTING_LEVEL = 4;
  loading: boolean = false;

  @Input() classificatorCode: string;
  highLevelParents: ElementShortInfo[];
  elements: Element[];

  constructor(private service: ClassificatorService,
              private eventService: EventService) {
  }

  ngOnInit(): void {
    this.eventService.subscribeFor(
      'ClassificatorTreeComponent',
      Actions.CLASSIFICATOR_SELECTED,
      (data: ChangedUrl) => {
        this.classificatorCode = data.classificator;
        this.loadTreeData(data.parentCode, data.childCode, true, true);
      }
    );

    this.eventService.subscribeFor(
      'ClassificatorTreeComponent',
      Actions.ROW_EXPANDED,
      data => {
        const classificator = data as Element;
        if (classificator.level >= ClassificatorTreeComponent.MAX_NESTING_LEVEL) {
          const futureRoot = this.findFutureRootClassificatorFrom(classificator);
          this.decrementLevelsIn(futureRoot.children);
          this.elements = futureRoot.children;
          this.highLevelParents.push({code: futureRoot.code, name: futureRoot.name});
        }
      });
  }

  private decrementLevelsIn(classificators: Element[]) {
    for (const classificator of classificators) {
      classificator.level--;

      if (classificator.hasChildren && classificator.children != null)
        this.decrementLevelsIn(classificator.children);
    }
  }

  private findFutureRootClassificatorFrom(classificator: Element): Element {
    let tempClassificator = classificator;
    for (let _i = 0; _i < ClassificatorTreeComponent.MAX_NESTING_LEVEL; _i++)
      tempClassificator = tempClassificator.parent;
    return tempClassificator;
  }

  moveToParent($event, code) {
    $event.preventDefault();
    this.loadTreeData(code);
    const index = _.findIndex(this.highLevelParents, it => it.code === code);
    this.highLevelParents = _.slice(this.highLevelParents, 0, index + 1);
  }

  private loadTreeData(parentCode?: string, childCode?: string, withBreadCrumps: Boolean = false, withScrollToTree: Boolean = false) {
    this.loading = true;
    if (parentCode) {
      this.service.getElement(this.classificatorCode, parentCode)
        .subscribe(
          element => {
            if (withBreadCrumps) {
              this.highLevelParents = [{name: 'Root'}].concat(element.path);
            }
            this.elements = element.children.map(child => {
              return {
                code: child.code,
                name: child.name,
                level: 0,
                expanded: false,
                hasChildren: child.hasChildren,
                withDetailInfo: child.code === childCode,
                path: child.path,
                parent: element,
                parentCode: child.parentCode,
                links: child.links
              };
            });

            if (withScrollToTree)
              document.getElementById('classificators').scrollIntoView({block: 'start', behavior: 'smooth'});

            this.loading = false;
          }
        );
    } else {
      if (withBreadCrumps)
        this.highLevelParents = [{name: 'Root'}];

      this.service.getElementChildren(this.classificatorCode)
        .mergeMap(it => it)
        .map(it => {
          return {
            code: it.code,
            name: it.name,
            level: 0,
            expanded: false,
            hasChildren: it.hasChildren,
            parentCode: it.parentCode,
            withDetailInfo: false,
            path: [],
            links: it.links
          };
        })
        .toArray()
        .subscribe(elements => {
          this.elements = elements;
          if (withScrollToTree)
            document.getElementById('classificators').scrollIntoView({block: 'end', behavior: 'smooth'});
          this.loading = false;
        });
    }
  }

  ngOnDestroy(): void {
    this.eventService.unsubscribeAllFor('ClassificatorTreeComponent');
  }
}
