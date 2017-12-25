import {Component, Input, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {ElementDetailInfo} from '../model/ElementDetailInfo';
import {ElementLink} from '../model/ElementLink';
import {ClassificatorLinkCategory} from '../model/LinkCategories';
import {EventService} from '../service/event.service';
import {Actions} from '../service/Actions';
import {ChangedUrl} from '../model/ChangedUrl';
import {Element} from '../model/Element';
import {ClassificatorService} from '../service/classificator.service';

@Component({
  selector: 'clsf-tree-node-detail-info',
  templateUrl: './classificator-tree-node-detail-info.component.html',
  styleUrls: ['./classificator-tree-node-detail-info.component.scss']
})
export class ClassificatorTreeNodeDetailInfoComponent implements OnInit {
  @Input() element: Element;
  detailInfo: ElementDetailInfo;

  constructor(private location: Location,
              private eventService: EventService) {
  }

  ngOnInit() {
    this.detailInfo = {
      code: this.element.code,
      name: this.element.name,
      description: '',
      links: this.element.links
        ? Object.keys(this.element.links).map(
          linkCategory => {
            return {
              name: linkCategory,
              links: this.element.links[linkCategory]
            };
          })
        : []
    };
  }

  goToLink($event, linkCategory: ClassificatorLinkCategory, link: ElementLink) {
    $event.preventDefault();
    this.location.go('/classificator/' + linkCategory.name + '/root/' + link.parentCode + '/child/' + this.detailInfo.code);
    this.eventService.publish(
      Actions.URL_CHANGED,
      new ChangedUrl(linkCategory.name, link.parentCode, link.code));
  }
}
