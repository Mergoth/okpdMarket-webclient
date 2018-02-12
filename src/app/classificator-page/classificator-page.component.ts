import {Component, OnInit} from '@angular/core';
import {ClassificatorService} from '../service/classificator.service';
import {Classificator} from '../model/Classificator';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/publishReplay';

@Component({
  selector: 'clsf-classificator-page',
  templateUrl: './classificator-page.component.html',
  styleUrls: ['./classificator-page.component.scss']
})
export class ClassificatorPageComponent implements OnInit {
  classificators: Observable<Classificator[]>;

  constructor(private classificatorService: ClassificatorService) {
  }

  ngOnInit() {
    this.classificators = this.classificatorService.getClassificators()
      .publishReplay(1)
      .refCount();
  }
}
