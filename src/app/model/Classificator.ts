import {Observable} from 'rxjs/Observable';

export interface Classificator {
  id: number;
  name: string;
  hasChildren: boolean;
  expanded?: boolean;
  children?: Classificator[];
  childrenCount?: number;
}
