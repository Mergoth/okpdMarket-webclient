import {Component, OnInit} from '@angular/core';
import {ClassificatorService} from '../service/classificator.service';
import {Classificator} from '../model/Classificator';
import {EventService} from '../service/event.service';
import {Actions} from '../service/Actions';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {ChangedUrl} from '../model/ChangedUrl';


@Component({
  selector: 'clsf-classificators',
  templateUrl: './classificators.component.html',
  styleUrls: ['./classificators.component.scss']
})
export class ClassificatorsComponent implements OnInit {
  classificators: Classificator[];
  activeClassificatorCode = '';

  constructor(private classificatorService: ClassificatorService,
              private eventService: EventService,
              private activatedRoute: ActivatedRoute,
              private location: Location) {
  }

  ngOnInit() {
    console.log('Classificators on init');
    this.classificatorService.getClassificators().subscribe(
      classificators => {
        const classificatorCodeFromUrl = this.activatedRoute.snapshot.params['classificator'];
        this.classificators = classificators;

        if (classificators.length > 0) {
          if (classificatorCodeFromUrl == null) {
            this.location.go('/classificator/' + classificators[0].code);
            this.activeClassificatorCode = classificators[0].code;
          } else {
            this.activeClassificatorCode = classificatorCodeFromUrl;
          }

          this.eventService.publish(Actions.CLASSIFICATOR_SELECTED, new ChangedUrl(this.activeClassificatorCode));
        } else {
          // todo:xxx maybe you need to render some empty state
          this.eventService.publish(Actions.CLASSIFICATOR_SELECTED, new ChangedUrl(''));
        }
      }
    );

    this.eventService.subscribeFor('Classificators', Actions.URL_CHANGED,
      (data: ChangedUrl) => {
        console.log(data);
        this.activeClassificatorCode = data.classificator;
        this.eventService.publish(Actions.CLASSIFICATOR_SELECTED, data);
      });

    this.location.subscribe(
      data => {
        console.log('location changed');
        console.log(data);
        if (data.type === 'popstate') {
          // const classificatorCodeFromUrl = this.activatedRoute.snapshot.params['classificator'];
          // console.log(classificatorCodeFromUrl);
          // if (classificatorCodeFromUrl != null) {
          //   this.activeClassificatorCode = classificatorCodeFromUrl;
          //   this.eventService.publish(Actions.CLASSIFICATOR_SELECTED, classificatorCodeFromUrl);
          // }
        }
      }
    );
  }

  selectClassificator(code) {
    this.activeClassificatorCode = code;
    this.eventService.publish(Actions.CLASSIFICATOR_SELECTED, new ChangedUrl(code));
  }
}
