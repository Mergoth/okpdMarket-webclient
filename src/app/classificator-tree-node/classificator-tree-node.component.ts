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
import {Location} from '@angular/common';

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
  @Output() detailInfo: Observable<ElementDetailInfo>;
  @Input() classificatorCode: string;

  constructor(private classificatorService: ClassificatorService,
              private eventService: EventService,
              private location: Location) {
  }

  ngOnInit() {
    if (this.element.withDetailInfo)
      this.showDetailInfo();
  }

  toggleTreeNode() {
    if (this.gettingChildrenInProgress || !this.element.hasChildren)
      return;

    const wasExpanded = this.element.expanded;

    if (wasExpanded) {
      this.element.expanded = !wasExpanded;
    } else {
      this.gettingChildrenInProgress = true;
      this.classificatorService.getElementChildren(this.classificatorCode, this.element.code)
        .mergeMap(it => it)
        .map(element => {
          return {
            code: element.code,
            name: element.name,
            level: this.element.level + 1,
            expanded: false,
            hasChildren: element.hasChildren,
            parent: this.element,
            parentCode: element.parentCode,
            withDetailInfo: false,
            links: element.links,
            path: element.path
          };
        })
        .toArray()
        .subscribe(children => {
          this.element.children = children;
          this.element.expanded = !wasExpanded;
          this.gettingChildrenInProgress = false;
        });

      this.eventService.publish(Actions.ROW_EXPANDED, this.element);
    }
  }

  showDetailInfo($event?) {
    if ($event != null)
      $event.stopPropagation();
    this.element.withDetailInfo = true;
    const parentCode = this.element.parent ? this.element.parent.code : '0';
    this.location.go(`/classificator/${this.classificatorCode}/root/${parentCode}/child/${this.element.code}`);
  }

  closeDetailInfo($event: Event) {
    $event.stopPropagation();
    this.element.withDetailInfo = false;
  }
}
