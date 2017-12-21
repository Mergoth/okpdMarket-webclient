import {ClassificatorLinkCategory} from './LinkCategories';

export interface ElementDetailInfo {
  code: string;
  name: string;
  description: string;
  links: ClassificatorLinkCategory[];
}
