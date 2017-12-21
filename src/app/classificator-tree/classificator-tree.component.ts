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
        this.loadTreeData(data.parentCode, data.childCode, true);
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

  private loadTreeData(parentCode?: string, childCode?: string, withBreadCrumps: Boolean = false) {
    if (parentCode) {
      this.service.getElement(this.classificatorCode, parentCode)
        .subscribe(
          element => {
            if (withBreadCrumps)
              this.highLevelParents = [{name: 'Root'}].concat(element.path);

            this.elements = element.children.map(it => {
              return {
                code: it.code,
                name: it.name,
                level: 0,
                expanded: false,
                hasChildren: it.hasChildren,
                withDetailInfo: it.code === childCode,
                path: it.path,
                parent: element
              };
            });
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
            withDetailInfo: false,
            path: []
          };
        })
        .toArray()
        .subscribe(elements => {
          this.elements = elements;
        });
    }
  }

  ngOnDestroy(): void {
    this.eventService.unsubscribeAllFor('ClassificatorTreeComponent');
  }
}
