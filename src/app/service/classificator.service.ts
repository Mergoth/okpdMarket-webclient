import {Injectable} from '@angular/core';
import {Classificator} from '../model/Classificator';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class ClassificatorService {

  constructor(private httpClient: HttpClient) {
  }

  getChildren(parentId: number): Observable<Classificator[]> {
    return this.httpClient.get<Classificator[]>(`classificator/${parentId}/children`);
  }
}
