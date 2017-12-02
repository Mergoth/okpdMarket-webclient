import {Component, OnDestroy, OnInit} from '@angular/core';
import {ClassificatorService} from '../service/classificator.service';
import {Classificator} from '../model/Classificator';
import {EventService} from '../service/event.service';
import {Actions} from '../service/Actions';
import _ from 'lodash/array';

@Component({
  selector: 'clsf-classificator-tree',
  templateUrl: './classificator-tree.component.html',
  styleUrls: ['./classificator-tree.component.css']
})
export class ClassificatorTreeComponent implements OnInit, OnDestroy {
  static MAX_NESTING_LEVEL = 4;

  highLevelParents: { id: number, name: string }[] = [{id: 0, name: 'Root'}];
  classificators: Classificator[];

  constructor(private service: ClassificatorService,
              private eventService: EventService) {
  }

  ngOnInit(): void {
    this.initRootClassificators();
    this.subscribeToInsterestedEvents();
  }

  private initRootClassificators() {
    this.initializeRootClassificators(0);
  }

  private initializeRootClassificators(parentId: number) {
    this.service.getChildren(parentId)
      .mergeMap(it => it)
      .map(it => {
        return {
          id: it.id,
          name: it.name,
          level: 0,
          expanded: false,
          hasChildren: it.hasChildren
        };
      })
      .toArray()
      .subscribe(classificators => {
        this.classificators = classificators;
      });
  }

  private subscribeToInsterestedEvents() {
    this.eventService.subscribeFor(
      `ClassificatorTreeComponent`,
      Actions.ROW_EXPANDED,
      data => {
        const classificator = data as Classificator;
        if (classificator.level >= ClassificatorTreeComponent.MAX_NESTING_LEVEL) {
          const futureRoot = this.findFutureRootClassificatorFrom(classificator);
          this.decrementLevelsIn(futureRoot.children);
          this.classificators = futureRoot.children;
          this.highLevelParents.push({id: futureRoot.id, name: futureRoot.name});
        }
      });
  }

  private decrementLevelsIn(classificators: Classificator[]) {
    for (const classificator of classificators) {
      classificator.level--;

      if (classificator.hasChildren && classificator.children != null)
        this.decrementLevelsIn(classificator.children);
    }
  }

  private findFutureRootClassificatorFrom(classificator: Classificator): Classificator {
    let tempClassificator = classificator;
    for (let _i = 0; _i < ClassificatorTreeComponent.MAX_NESTING_LEVEL; _i++)
      tempClassificator = tempClassificator.parent;
    return tempClassificator;
  }

  moveToParent(id) {
    this.initializeRootClassificators(id);
    const index = _.findIndex(this.highLevelParents, it => it.id === id);
    this.highLevelParents = _.slice(this.highLevelParents, 0, index + 1);
  }

  ngOnDestroy(): void {
    this.eventService.unsubscribeAllFor('ClassificatorTreeComponent');
  }
}
