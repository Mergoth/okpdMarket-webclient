import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Element} from '../model/Element';
import {ClassificatorService} from '../service/classificator.service';
import {Classificator} from '../model/Classificator';
import {Location} from '@angular/common';
import {EventService} from '../service/event.service';
import {Actions} from '../service/Actions';
import {ChangedUrl} from '../model/ChangedUrl';

@Component({
  selector: 'clsf-search-by-text',
  templateUrl: './search-by-text.component.html',
  styleUrls: ['./search-by-text.component.scss']
})
export class SearchByTextComponent implements OnInit {
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
