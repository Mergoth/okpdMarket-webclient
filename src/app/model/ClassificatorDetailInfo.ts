import {ClassificatorLinkCategory} from './LinkCategories';

export interface ClassificatorDetailInfo {
  code: number;
  name: string;
  description: string;
  links: ClassificatorLinkCategory[];
}
