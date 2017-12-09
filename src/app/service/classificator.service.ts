import {Injectable} from '@angular/core';
import {Element} from '../model/Element';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import {ElementDetailInfo} from '../model/ElementDetailInfo';
import {Classificator} from '../model/Classificator';

@Injectable()
export class ClassificatorService {

  constructor(private httpClient: HttpClient) {
  }

  getClassificators(): Observable<Classificator[]> {
    return this.httpClient.get<Classificator[]>(`classificator/all`);
  }

  getElementChildren(classificatorCode: string, parentId: number): Observable<Element[]> {
    return this.httpClient.get<Element[]>(`classificator/${classificatorCode}/element/${parentId}/children`);
  }

  getElementDetailInfo(classificatorCode: string, code: number): Observable<ElementDetailInfo> {
    return this.httpClient.get<ElementDetailInfo>(`classificator/${classificatorCode}/element/${code}/detailInfo`);
  }
}
