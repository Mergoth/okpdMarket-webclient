export interface Classificator {
  id: number;
  name: string;
  parent?: Classificator;
  level: number;
  hasChildren: boolean;
  expanded?: boolean;
  children?: Classificator[];
  childrenCount?: number;
}
