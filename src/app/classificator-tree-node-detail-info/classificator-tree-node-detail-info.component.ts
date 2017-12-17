import {Component, Input, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {ElementDetailInfo} from '../model/ElementDetailInfo';
import {ElementLink} from '../model/ElementLink';
import {ClassificatorLinkCategory} from '../model/LinkCategories';
import {EventService} from '../service/event.service';
import {Actions} from '../service/Actions';
import {ChangedUrl} from '../model/ChangedUrl';
import {ClassificatorService} from '../service/classificator.service';

@Component({
  selector: 'clsf-tree-node-detail-info',
  templateUrl: './classificator-tree-node-detail-info.component.html',
  styleUrls: ['./classificator-tree-node-detail-info.component.scss']
})
export class ClassificatorTreeNodeDetailInfoComponent implements OnInit {
  @Input() classificatorCode: string;
  @Input() elementCode: number;
  detailInfo: ElementDetailInfo;

  constructor(private location: Location,
              private classificatorService: ClassificatorService,
              private eventService: EventService) {
  }

  ngOnInit() {
    const detailInfo$ = this.classificatorService.getElementDetailInfo(this.classificatorCode, this.elementCode);
    if (detailInfo$ != null) {
      detailInfo$.subscribe(
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

  goToLink($event, linkCategory: ClassificatorLinkCategory, link: ElementLink) {
    $event.preventDefault();
    this.location.go('/classificator/' + linkCategory.name + '/root/' + link.parentCode + '/child/' + this.detailInfo.code);
    this.eventService.publish(
      Actions.URL_CHANGED,
      new ChangedUrl(linkCategory.name, link.parentCode, link.code));
  }
}
