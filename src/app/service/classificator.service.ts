import {Injectable} from '@angular/core';
import {Classificator} from "../model/Classificator";

@Injectable()
export class ClassificatorService {

  constructor() {
  }

  getChildren(parentId: number): Classificator[] {
    const result = [];
    for (let _i = 1; _i < 6; _i++) {

      const id = parentId * 10 + _i;
      result.push({
        id: id,
        name: `Child ${id}`,
        hasChildren: parentId < 10000
      });
    }

    return result;
  }
}
