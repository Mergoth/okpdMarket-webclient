import {ChainInPath} from './ChainInPath';

export interface Element {
  code: string;
  name: string;
  level: number;
  parent?: Element;
  hasChildren: boolean;
  expanded?: boolean;
  children?: Element[];
  childrenCount?: number;
  withDetailInfo: Boolean;
  path: ChainInPath[];
}
