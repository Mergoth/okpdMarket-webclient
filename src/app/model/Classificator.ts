export interface Classificator {
  id: number;
  name: string;
  hasChildren: boolean;
  expanded?: boolean;
  children?: Classificator[];
}
