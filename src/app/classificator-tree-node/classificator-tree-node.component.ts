import {Component, Input, OnInit} from '@angular/core';
import {Classificator} from '../model/Classificator';
import {ClassificatorService} from '../service/classificator.service';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toArray';


import {animate, state, style, transition, trigger} from '@angular/animations';

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

  constructor(private classificatorService: ClassificatorService) {
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
    }
  }
}
