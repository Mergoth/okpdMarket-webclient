import {Component, Input, OnInit, Output} from '@angular/core';
import {Element} from '../model/Element';
import {ClassificatorService} from '../service/classificator.service';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toArray';


import {animate, state, style, transition, trigger} from '@angular/animations';
import {EventService} from '../service/event.service';
import {Actions} from '../service/Actions';
import {Observable} from 'rxjs/Observable';
import {ElementDetailInfo} from '../model/ElementDetailInfo';

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
  styleUrls: ['./classificator-tree-node.component.scss']
})
export class ClassificatorTreeNodeComponent implements OnInit {
  @Input() element: Element;
  gettingChildrenInProgress = false;
  @Input() withDetailInfo?: boolean;
  @Output() detailInfo: Observable<ElementDetailInfo>;
  @Input() classificatorCode: string;

  constructor(private classificatorService: ClassificatorService,
              private eventService: EventService) {
  }

  ngOnInit() {
  }

  toggleTreeNode() {
    if (this.gettingChildrenInProgress || !this.element.hasChildren)
      return;

    const wasExpanded = this.element.expanded;

    if (wasExpanded) {
      this.element.expanded = !wasExpanded;
    } else {
      this.gettingChildrenInProgress = true;
      this.classificatorService.getElementChildren(this.classificatorCode, this.element.id)
        .mergeMap(it => it)
        .map(classificator => {
          return {
            id: classificator.id,
            name: classificator.name,
            level: this.element.level + 1,
            expanded: false,
            hasChildren: classificator.hasChildren,
            parent: this.element
          };
        })
        .toArray()
        .subscribe(classificators => {
          this.element.children = classificators;
          this.element.expanded = !wasExpanded;
          this.gettingChildrenInProgress = false;
        });

      this.eventService.publish(Actions.ROW_EXPANDED, this.element);
    }
  }

  showDetailInfo($event) {
    $event.stopPropagation();
    this.detailInfo = this.classificatorService.getElementDetailInfo(this.classificatorCode, this.element.id);
    this.withDetailInfo = true;
  }

  closeDetailInfo($event: Event) {
    $event.stopPropagation();
    this.withDetailInfo = false;
  }
}
