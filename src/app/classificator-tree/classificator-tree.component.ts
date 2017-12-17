import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ClassificatorService} from '../service/classificator.service';
import {Element} from '../model/Element';
import {EventService} from '../service/event.service';
import {Actions} from '../service/Actions';
import _ from 'lodash/array';
import {ChangedUrl} from '../model/ChangedUrl';
import {ElementShortInfo} from '../model/ElementShortInfo';

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
    this.resetHighLevelParents();
    this.eventService.subscribeFor(
      'ClassificatorTreeComponent',
      Actions.CLASSIFICATOR_SELECTED,
      (data: ChangedUrl) => {
        this.classificatorCode = data.classificator;
        this.resetHighLevelParents(data.parentCode);
        this.loadChildren(data.parentCode, data.childCode);
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
          this.highLevelParents.push({code: futureRoot.id, name: futureRoot.name});
        }
      });
  }

  private loadChildren(parentCode?: number, childCode?: number) {
    this.service.getElementChildren(this.classificatorCode, parentCode ? parentCode : 0)
      .mergeMap(it => it)
      .map(it => {
        return {
          id: it.id,
          name: it.name,
          level: 0,
          expanded: false,
          hasChildren: it.hasChildren,
          withDetailInfo: it.id === childCode
        };
      })
      .toArray()
      .subscribe(elements => {
        this.elements = elements;
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

  moveToParent($event, id) {
    $event.preventDefault();
    this.loadChildren(id);
    const index = _.findIndex(this.highLevelParents, it => it.id === id);
    this.highLevelParents = _.slice(this.highLevelParents, 0, index + 1);
  }

  private resetHighLevelParents(rootCode: number = 0) {
    const root = {code: 0, name: 'Root'};
    if (rootCode === 0) {
      this.highLevelParents = [root];
    } else {
      this.service.getElementParents(this.classificatorCode, rootCode)
        .subscribe(data => {
          this.highLevelParents = [root].concat(data);
        });
    }
  }

  ngOnDestroy(): void {
    this.eventService.unsubscribeAllFor('ClassificatorTreeComponent');
  }
}
