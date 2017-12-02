import {Component, Input, OnInit, Output} from '@angular/core';
import {Classificator} from '../model/Classificator';
import {ClassificatorService} from '../service/classificator.service';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toArray';


import {animate, state, style, transition, trigger} from '@angular/animations';
import {EventService} from '../service/event.service';
import {Actions} from '../service/Actions';
import {Observable} from 'rxjs/Observable';
import {ClassificatorDetailInfo} from '../model/ClassificatorDetailInfo';

@Component({
  selector: 'clsf-classificator-tree-node',
  templateUrl: './classificator-tree-node.component.html',
  animations: [
    trigger('expanded', [
      state('true', style({
        'transform': 'rotate(90deg)'
      })),
      state('false', style({
        'transform': 'rotate(0)'
      })),
      transition('* => *', animate('.2s'))
    ])
  ],
  styleUrls: ['./classificator-tree-node.component.css']
})
export class ClassificatorTreeNodeComponent implements OnInit {
  @Input() classificator: Classificator;
  gettingChildrenInProgress = false;
  @Input() withDetailInfo?: boolean;
  @Output() detailInfo: Observable<ClassificatorDetailInfo>;

  constructor(private classificatorService: ClassificatorService,
              private eventService: EventService) {
  }

  ngOnInit() {
  }

  toggleTreeNode() {
    if (this.gettingChildrenInProgress || !this.classificator.hasChildren)
      return;

    const wasExpanded = this.classificator.expanded;

    if (wasExpanded) {
      this.classificator.expanded = !wasExpanded;
    } else {
      this.gettingChildrenInProgress = true;
      this.classificatorService.getChildren(this.classificator.id)
        .mergeMap(it => it)
        .map(classificator => {
          return {
            id: classificator.id,
            name: classificator.name,
            level: this.classificator.level + 1,
            expanded: false,
            hasChildren: classificator.hasChildren,
            parent: this.classificator
          };
        })
        .toArray()
        .subscribe(classificators => {
          this.classificator.children = classificators;
          this.classificator.expanded = !wasExpanded;
          this.gettingChildrenInProgress = false;
        });

      this.eventService.publish(Actions.ROW_EXPANDED, this.classificator);
    }
  }

  showDetailInfo($event) {
    $event.stopPropagation();
    this.detailInfo = this.classificatorService.getDetailInfo(this.classificator.id);
    this.withDetailInfo = true;
  }

  closeDetailInfo($event: Event) {
    $event.stopPropagation();
    this.withDetailInfo = false;
  }
}
