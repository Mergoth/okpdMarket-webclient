import {ClassificatorLinkCategory} from './LinkCategories';

export interface ElementDetailInfo {
  code: number;
  name: string;
  description: string;
  links: ClassificatorLinkCategory[];
}
