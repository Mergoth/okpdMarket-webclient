import {Component, Input, OnInit} from '@angular/core';
import {ElementDetailInfo} from '../model/ElementDetailInfo';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'clsf-tree-node-detail-info',
  templateUrl: './classificator-tree-node-detail-info.component.html',
  styleUrls: ['./classificator-tree-node-detail-info.component.scss']
})
export class ClassificatorTreeNodeDetailInfoComponent implements OnInit {
  @Input() detailInfo$: Observable<Object>;
  detailInfo: ElementDetailInfo;

  constructor() {
  }

  ngOnInit() {
    this.detailInfo$.subscribe(
      it => {
        const categories = it['links'];
        const categoryNames = Object.keys(categories);

        this.detailInfo = {
          code: it['code'],
          name: it['name'],
          description: it['description'],
          classificatorCode: it['classificatorCode'],
          links: categoryNames.map(category => {
            return {
              name: category,
              links: categories[category]
            };
          })
        };
      }
    );
  }
}
