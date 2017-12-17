import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ClassificatorService} from '../service/classificator.service';
import {Element} from '../model/Element';
import {EventService} from '../service/event.service';
import {Actions} from '../service/Actions';
import _ from 'lodash/array';
import {ChangedUrl} from '../model/ChangedUrl';

@Component({
  selector: 'clsf-classificator-tree',
  templateUrl: './classificator-tree.component.html',
  styleUrls: ['./classificator-tree.component.scss']
})
export class ClassificatorTreeComponent implements OnInit, OnDestroy {
  static MAX_NESTING_LEVEL = 4;

  @Input() classificatorCode: string;
  highLevelParents: { id: number, name: string }[];
  elements: Element[];

  constructor(private service: ClassificatorService,
              private eventService: EventService) {
  }

  ngOnInit(): void {
    this.resetRootParent();
    this.eventService.subscribeFor(
      'ClassificatorTreeComponent',
      Actions.CLASSIFICATOR_SELECTED,
      (data: ChangedUrl) => {
        this.classificatorCode = data.classificator;
        this.resetRootParent(data.parentCode);
        console.log(Actions.CLASSIFICATOR_SELECTED, data);
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
          this.highLevelParents.push({id: futureRoot.id, name: futureRoot.name});
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

  private resetRootParent(rootCode?: number) {
    // todo: need to complete
    if (rootCode === 0)
      this.highLevelParents = [{id: 0, name: 'Root'}];
    else
      this.highLevelParents = [{id: 0, name: 'Root'}, {id: 1, name: 'Some ' + rootCode}];
  }

  ngOnDestroy(): void {
    this.eventService.unsubscribeAllFor('ClassificatorTreeComponent');
  }
}
