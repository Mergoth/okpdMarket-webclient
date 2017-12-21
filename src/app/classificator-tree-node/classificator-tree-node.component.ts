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
import {ActivatedRoute} from '@angular/router';
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
              private activatedRoute: ActivatedRoute,
              private location: Location) {
  }

  ngOnInit() {
    const childCode = this.activatedRoute.snapshot.params['childCode'];
    if (childCode && childCode === this.element.code)
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
        .map(classificator => {
          return {
            code: classificator.code,
            name: classificator.name,
            level: this.element.level + 1,
            expanded: false,
            hasChildren: classificator.hasChildren,
            parent: this.element,
            withDetailInfo: false
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

  showDetailInfo($event?) {
    if ($event != null)
      $event.stopPropagation();
    this.element.withDetailInfo = true;
    const parentCode = this.element.parent ? this.element.parent.code : '0';
    console.log(parentCode)
    this.location.go(`/classificator/${this.classificatorCode}/root/${parentCode}/child/${this.element.code}`);
  }

  closeDetailInfo($event: Event) {
    $event.stopPropagation();
    this.element.withDetailInfo = false;
  }
}
