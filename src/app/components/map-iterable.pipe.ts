import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'mapIterable'})
export class MapIterable implements PipeTransform {
  transform(dict: Object): any {
    const a = [];
    for (const key in dict) {
      if (dict.hasOwnProperty(key)) {
        a.push({key: key, val: dict[key]});
      }
    }
    return a;
  }
}