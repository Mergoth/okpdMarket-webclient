import {Component, Input, OnInit} from '@angular/core';
import {ClassificatorDetailInfo} from '../model/ClassificatorDetailInfo';
import {Observable} from 'rxjs/Observable';
import {ClassificatorLinkCategory} from '../model/LinkCategories';

@Component({
  selector: 'classificator-tree-node-detail-info',
  templateUrl: './classificator-tree-node-detail-info.component.html',
  styleUrls: ['./classificator-tree-node-detail-info.component.css']
})
export class ClassificatorTreeNodeDetailInfoComponent implements OnInit {
  @Input() detailInfo$: Observable<Object>;
  detailInfo: ClassificatorDetailInfo;

  constructor() { }

  ngOnInit() {
    this.detailInfo$.subscribe(
      it => {
        const categories = it['links'];
        console.log(categories);
        const categoryNames = Object.keys(categories);
        let temp = categoryNames.map(category => {
          return {
            name: category,
            links: categories[category]
          };
        });

        console.log(temp);

        this.detailInfo = {
          code: it['code'],
          name: it['name'],
          description: it['description'],
          links: temp
        };
      }
    );
  }
}
