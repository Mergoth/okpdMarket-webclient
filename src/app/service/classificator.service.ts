import {Injectable} from '@angular/core';
import {Element} from '../model/Element';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';
import {Classificator} from '../model/Classificator';
import {environment} from '../../environments/environment';

const baseUrl = environment.baseUrl;

@Injectable()
export class ClassificatorService {

  constructor(private httpClient: HttpClient) {
  }

  getClassificators(): Observable<Classificator[]> {
    console.log('get classificators');
    return this.httpClient.get<Classificator[]>(`${baseUrl}/classificators`);
  }

  getElementChildren(classificatorCode: string, parentCode?: string): Observable<Element[]> {
    return parentCode
      ? this.httpClient.get<Element>(`${baseUrl}/classificators/${classificatorCode}/${parentCode}`).map(it => it.children)
      : this.httpClient.get<Element[]>(`${baseUrl}/classificators/${classificatorCode}`);
  }

  getElement(classificatorCode: string, code: string): Observable<Element> {
    return this.httpClient.get<Element>(`${baseUrl}/classificators/${classificatorCode}/${code}`);
  }

  searchElements(classificatorCode: string, query: string, page: number): Observable<Element[]> {
    return this.httpClient.get<Element[]>(`${baseUrl}/classificators/${classificatorCode}/search?query=${query}&page=${page}`);
  }
}
