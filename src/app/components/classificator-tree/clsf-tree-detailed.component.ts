import {Component, OnInit} from "@angular/core";
import {Location} from "@angular/common";
import {ClsfTreeService} from "./service/clsf-tree.service";
import {Tree} from "./model/tree.model";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'clsf-tree-detailed',
    styleUrls: ['./clsf-tree-detailed.css'],
    providers: [
        ClsfTreeService
    ],
    template: `        
        <div class="detailed" *ngIf="tree">
            <md-icon class="backspace" (click)="back()">backspace</md-icon>
            <nav class="path">
                <div *ngFor="let item of treePath();let i=index">
                    <a class="node" [style.margin-left.px]="i*10"  [routerLink]="['/tree', clsfType, item.code]">
                        <md-icon>keyboard_arrow_right</md-icon>&nbsp;<span class="code">{{item.code}}</span> {{item.name}}
                    </a>
                </div>
            </nav>
            <h2>{{tree.classificator.code}} {{tree.classificator.name}}</h2>
            <p>{{tree.classificator.notes}}</p>
            <div class="linksWrapper">
                <h3>Связи</h3>
                <md-icon id="linkIcon">link</md-icon>
                <div *ngIf="tree.classificator.links" class="links">
                    <div *ngFor="let links of tree.classificator.links | mapIterable" class="section">
                        <div class="title">{{links.key}}:</div>
                        <span *ngFor="let link of links.val" class="link">
                            <a [routerLink]="['/tree', links.key, link.code]">{{link.code}}</a>
                            <span class="name">{{link.name}}</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    `
})
export class ClsfTreeDetailedComponent implements OnInit {

    clsfType: string;

    clsfCode: string;

    tree:Tree;

    constructor(private route: ActivatedRoute,
                private treeService: ClsfTreeService,
                private location: Location) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.clsfType = params['type'];
            this.clsfCode = params['code'];
            this.initTree();
        });
    }

    back() {
       console.log('back')
        this.location.back();
    }

    initTree() {
        this.treeService.updateTree(new Tree(this.clsfCode), this.clsfType).then(tree => this.tree = tree);
    }

    treePath() {
        const path = [];
        if(this.tree.path) {
            this.tree.path.forEach(item => {
                if(item['code'] != this.tree.classificator.code) {
                   path.push(item);
                }
            })
        }
        return path;
    }

}
