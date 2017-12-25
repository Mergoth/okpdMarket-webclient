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
      // transition('false => true', animate('.4s'))
    ])
  ]
})
export class ElementSearchComponent implements OnInit {
  SEARCH_BY_TEXT_TAB = 'search-by-text';
  SEARCH_BY_CODE_TAB = 'search-by-code';

  activeTab: string = this.SEARCH_BY_TEXT_TAB;

  shown = true;

  constructor() {
  }

  ngOnInit() {
  }


  moveToSearchByCode($event: Event) {
    $event.preventDefault();
    this.activeTab = this.SEARCH_BY_CODE_TAB;
  }

  moveToSearchByText($event: Event) {
    $event.preventDefault();
    this.activeTab = this.SEARCH_BY_TEXT_TAB;
  }

  toggleVisibility() {
    this.shown = !this.shown;
  }
}
