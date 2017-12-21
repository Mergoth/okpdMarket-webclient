import {Injectable} from '@angular/core';
import {Element} from '../model/Element';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';
import {Classificator} from '../model/Classificator';
import {ElementShortInfo} from '../model/ElementShortInfo';

@Injectable()
export class ClassificatorService {

  constructor(private httpClient: HttpClient) {
  }

  getClassificators(): Observable<Classificator[]> {
    return this.httpClient.get<Classificator[]>(`classificators`);
  }

  getElementChildren(classificatorCode: string, parentCode?: string): Observable<Element[]> {
    return parentCode
      ? this.httpClient.get<Element>(`classificators/${classificatorCode}/${parentCode}`).map(it => it.children)
      : this.httpClient.get<Element[]>(`classificators/${classificatorCode}`);
  }

  getElement(classificatorCode: string, code: string): Observable<Element> {
    return this.httpClient.get<Element>(`classificators/${classificatorCode}/${code}`);
  }

  getElementParents(classificatorCode: string, code: string): Observable<ElementShortInfo[]> {
    return this.httpClient.get<ElementShortInfo[]>(`classificator/${classificatorCode}/element/${code}/parents`);
  }
}
