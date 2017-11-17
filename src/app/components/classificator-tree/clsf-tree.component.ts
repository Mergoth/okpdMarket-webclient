import {Component, OnInit, OnDestroy} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Tree} from "./model/tree.model";
import {ClsfTreeService} from "./service/clsf-tree.service";
import {EventService} from "../../service/event.service";
import {EVENT_NODE_EXPAND} from './consts';

const COMPONENT_NAME = 'ClsfTreeComponent';
const CACHED_SATE = new Map<string, Tree>();

@Component({
  selector: 'clsf-tree',
  providers: [
    ClsfTreeService
  ],
  template: `
      <clsf-tree-view *ngIf="tree" [tree]="tree" [clsfType]="clsfType"></clsf-tree-view>
      <div class="loading" *ngIf="!tree"></div>
  `
})
export class ClsfTreeComponent implements OnInit, OnDestroy {

  clsfType: string;

  tree: Tree;

  constructor(private route: ActivatedRoute,
              private treeService: ClsfTreeService,
              private eventService: EventService
  ) {}

  initTree(clsfType: string) {
    this.clsfType = clsfType;
    if(CACHED_SATE.has(clsfType)) {
      this.tree = CACHED_SATE.get(clsfType);
    } else {
      this.treeService.updateTree(new Tree(), clsfType)
          .then(tree => {
            CACHED_SATE.set(clsfType, tree);
            this.tree = tree;
          });
    }
  }

  ngOnInit() {
   this.route.params.subscribe(params => {
      this.initTree(params['type']);
    });
    this.eventService.subscribeFor(COMPONENT_NAME, EVENT_NODE_EXPAND, this.expandNode);
  }

  ngOnDestroy() {
    this.eventService.unsubscribeAllFor(COMPONENT_NAME);
  }

  expandNode = (rootId: string) => {
    let subTree = this.tree.subTree(rootId);
    if (subTree.nodes == null) {
      this.treeService.updateTree(subTree, this.clsfType).then(tree =>  subTree = tree);
    }
  };

}




