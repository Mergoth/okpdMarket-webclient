import {Component, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'clsf-element-search',
  templateUrl: './element-search.component.html',
  styleUrls: ['./element-search.component.scss'],
  animations: [
    trigger('shown', [
      state('false', style({
        'display': 'none',
        'overflow': 'hidden',
        'height': '0',
        'padding-bottom': 0,
        'padding-top': 0
      })),
      transition('* => *', animate('.2s')),
    ])
  ]
})
export class ElementSearchComponent implements OnInit {
  shown = true;

  constructor() {
  }

  ngOnInit() {
  }

  toggleVisibility() {
    this.shown = !this.shown;
  }
}
