import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Location} from '@angular/common';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Element} from '../model/Element';
import {Observable} from 'rxjs/Observable';
import {Classificator} from '../model/Classificator';
import {EventService} from '../service/event.service';
import {ClassificatorService} from '../service/classificator.service';
import {Actions} from '../service/Actions';
import {ChangedUrl} from '../model/ChangedUrl';

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

  activeClassificatorCode: string;
  classificators: Classificator[];
  tableData: Observable<Element[]>;

  @ViewChild('searchInput') input: ElementRef;

  constructor(private classificatorService: ClassificatorService,
              private location: Location,
              private eventService: EventService) {
  }

  ngOnInit() {
    this.classificatorService.getClassificators().subscribe(
      classificators => {
        this.classificators = classificators;
        if (classificators.length > 0)
          this.activeClassificatorCode = classificators[0].code;
      }
    );
  }

  toggleVisibility() {
    this.shown = !this.shown;
  }

  search() {
    this.tableData = this.classificatorService.searchElements(
      this.activeClassificatorCode, this.input.nativeElement.value, 1
    );

    this.tableData
      .mergeMap(it => it)
      .subscribe(
        data => {
          console.log(data);
        }
      );
  }

  changeClassificator(value: string) {
    this.activeClassificatorCode = value;
  }

  searchKeyDown(keyCode) {
    if (keyCode === 13)
      this.search();
  }

  showInTree(parentCode: string,
             code: string,
             classificatorCode: string,
             $event) {
    $event.preventDefault();
    this.location.go('/classificator/' + classificatorCode + '/root/' + parentCode + '/child/' + code);
    this.eventService.publish(
      Actions.URL_CHANGED,
      new ChangedUrl(classificatorCode, parentCode, code, true));
  }
}
