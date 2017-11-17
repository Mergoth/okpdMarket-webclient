import {Component, Input} from "@angular/core";
import {Tree} from "./model/tree.model";
import {EventService} from "../../service/event.service";
import {EVENT_NODE_EXPAND} from './consts';

@Component({
  selector: 'clsf-tree-view',
  template: `
      <div *ngIf="tree != null">
          <div *ngFor="let node of tree.nodes">
              <clsf-tree-view-node (click)="expand(node)" [tree]="node" [level]="tree.level" [clsfType]="clsfType"></clsf-tree-view-node>
              <div *ngIf="node.expanded">
                  <clsf-tree-view [tree]="node" [clsfType]="clsfType"></clsf-tree-view>
              </div>
          </div>
      </div>
      <div class="loading" style="float: right; position: relative; top: -25px"  *ngIf="isLoading()"></div>
  `
})
export class ClsfTreeViewComponent {

    @Input() clsfType: string;

    @Input() tree: Tree;

    constructor(private eventService: EventService) {
    }

    isLoading() : boolean {
      return this.tree == null || this.tree.nodes == null;
    }

    expand(treeNode: Tree) {
        if(treeNode.hasNodes) {
            treeNode.expanded = !treeNode.expanded;
            this.eventService.publish(EVENT_NODE_EXPAND, treeNode.id);
        }
    }

}
