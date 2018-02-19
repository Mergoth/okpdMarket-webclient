import {Component, Input, OnInit} from '@angular/core';
import {Classificator} from '../model/Classificator';
import {EventService} from '../service/event.service';
import {Actions} from '../service/Actions';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {ChangedUrl} from '../model/ChangedUrl';
import {Observable} from 'rxjs/Observable';


@Component({
  selector: 'clsf-classificators',
  templateUrl: './classificators.component.html',
  styleUrls: ['./classificators.component.scss']
})
export class ClassificatorsComponent implements OnInit {
  @Input() classificators: Observable<Classificator[]>;
  activeClassificatorCode = '';

  constructor(private eventService: EventService,
              private activatedRoute: ActivatedRoute,
              private location: Location) {
  }

  ngOnInit() {
    this.classificators.subscribe(
      classificators => {
        const classificatorCodeFromUrl = this.activatedRoute.snapshot.params['classificator'];

        if (classificators.length > 0) {
          if (classificatorCodeFromUrl == null) {
            this.location.go('/classificator/' + classificators[0].code);
            this.activeClassificatorCode = classificators[0].code;
          } else {
            this.activeClassificatorCode = classificatorCodeFromUrl;
          }

          const rootParam = this.activatedRoute.snapshot.params['rootCode'];
          const childCodeParam = this.activatedRoute.snapshot.params['childCode'];

          this.eventService.publish(
            Actions.CLASSIFICATOR_SELECTED,
            new ChangedUrl(this.activeClassificatorCode, rootParam, childCodeParam));
        } else {
          // todo:xxx maybe you need to render some empty state
          this.eventService.publish(Actions.CLASSIFICATOR_SELECTED, new ChangedUrl(''));
        }
      }
    );

    this.eventService.subscribeFor('Classificators', Actions.URL_CHANGED,
      (data: ChangedUrl) => {
        this.activeClassificatorCode = data.classificator;
        this.eventService.publish(Actions.CLASSIFICATOR_SELECTED, data);
      });

    this.location.subscribe(
      data => {
        if (data.type === 'popstate') {
          // const classificatorCodeFromUrl = this.activatedRoute.snapshot.params['classificator'];
          // if (classificatorCodeFromUrl != null) {
          //   this.activeClassificatorCode = classificatorCodeFromUrl;
          //   this.eventService.publish(Actions.CLASSIFICATOR_SELECTED, classificatorCodeFromUrl);
          // }
        }
      }
    );
  }

  selectClassificator(code, $event) {
    $event.preventDefault();
    this.activeClassificatorCode = code;
    this.eventService.publish(Actions.CLASSIFICATOR_SELECTED, new ChangedUrl(code));
    this.location.go(`classificator/${this.activeClassificatorCode}`);
  }
}
