import {ClassificatorLinkCategory} from './LinkCategories';

export interface ElementDetailInfo {
  code: number;
  name: string;
  classificatorCode: string;
  description: string;
  links: ClassificatorLinkCategory[];
}
