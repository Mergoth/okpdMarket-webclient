import {ChainInPath} from './ChainInPath';
import {ElementLink} from './ElementLink';

export interface Element {
  code: string;
  name: string;
  level: number;
  parent?: Element;
  parentCode: string,
  hasChildren: boolean;
  expanded?: boolean;
  children?: Element[];
  withDetailInfo: Boolean;
  path: ChainInPath[];
  links: Map<String, ElementLink[]>;
}
