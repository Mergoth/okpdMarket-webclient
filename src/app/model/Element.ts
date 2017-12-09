export interface Element {
  id: number;
  name: string;
  parent?: Element;
  level: number;
  hasChildren: boolean;
  expanded?: boolean;
  children?: Element[];
  childrenCount?: number;
}
