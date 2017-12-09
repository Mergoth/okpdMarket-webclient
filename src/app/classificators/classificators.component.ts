import {Component, OnInit} from '@angular/core';
import {ClassificatorService} from '../service/classificator.service';
import {Classificator} from '../model/Classificator';
import {EventService} from '../service/event.service';
import {Actions} from '../service/Actions';


@Component({
  selector: 'clsf-classificators',
  templateUrl: './classificators.component.html',
  styleUrls: ['./classificators.component.scss']
})
export class ClassificatorsComponent implements OnInit {
  classificators: Classificator[];
  activeClassificatorCode = '';

  constructor(private classificatorService: ClassificatorService,
              private eventService: EventService) {
  }

  ngOnInit() {
    console.log('ClassificatorsComponent onInit');
    this.classificatorService.getClassificators().subscribe(
      classificators => {
        this.classificators = classificators;
        console.log(classificators);
        if (classificators.length > 0) {
          this.activeClassificatorCode = classificators[0].code;
          this.eventService.publish(Actions.CLASSIFICATOR_SELECTED, classificators[0].code);
        } else {
          this.eventService.publish(Actions.CLASSIFICATOR_SELECTED, '');
        }
      }
    );
  }

  selectClassificator(code) {
    this.activeClassificatorCode = code;
    this.eventService.publish(Actions.CLASSIFICATOR_SELECTED, code);
  }
}
