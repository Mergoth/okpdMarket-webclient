import {Component, Input, OnInit} from '@angular/core';
import {Classificator} from '../model/Classificator';
import {EventService} from '../service/event.service';
import {ClassificatorService} from '../service/classificator.service';
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
  @Input() level: number;


  constructor(private classificatorService: ClassificatorService,
              private eventService: EventService) {
  }

  ngOnInit() {

  }

  toggleTreeNode() {
    if (!this.classificator.hasChildren) {
      return;
    }

    const wasExpanded = this.classificator.expanded;

    if (!wasExpanded) {
      this.classificator.children =
        this.classificatorService.getChildren(this.classificator.id)
          .map(it => {
            return {
              'id': it.id,
              name: it.name,
              expanded: false,
              hasChildren: it.hasChildren
            };
          });

      this.eventService.publish('classificatorExpanded', {
        'classificatorId': this.classificator.id
      });
    }

    this.classificator.expanded = !wasExpanded;
  }
}