import {Component, OnInit} from '@angular/core';
import {ClassificatorService} from '../service/classificator.service';
import {Classificator} from '../model/Classificator';

@Component({
  selector: 'clsf-classificator-tree',
  templateUrl: './classificator-tree.component.html',
  styleUrls: ['./classificator-tree.component.css']
})
export class ClassificatorTreeComponent implements OnInit {
  classificators: Classificator[];

  constructor(private service: ClassificatorService) {
  }

  ngOnInit(): void {
    this.service.getChildren(0)
      .subscribe(classificators => {
        this.classificators = classificators;
      });
  }
}
