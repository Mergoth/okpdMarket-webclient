import {Component} from '@angular/core';
import {ClassificatorService} from '../service/classificator.service';
import {Classificator} from '../model/Classificator';

@Component({
  selector: 'clsf-classificator-tree',
  templateUrl: './classificator-tree.component.html',
  styleUrls: ['./classificator-tree.component.css']
})
export class ClassificatorTreeComponent {
  classificators: Classificator[] = [
    {
      id: 1,
      name: 'First Parent',
      expanded: false,
      hasChildren: true
    }, {
      id: 2,
      name: 'Second Parent',
      expanded: false,
      hasChildren: true,
    }
  ];

  constructor(private service: ClassificatorService) {

  }
}
