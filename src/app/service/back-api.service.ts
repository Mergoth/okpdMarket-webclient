import {Injectable} from "@angular/core";
import {environment} from '../../environments/environment';
import {Http, Headers, Response, URLSearchParams, RequestOptions} from "@angular/http";
import "./rxjs-operators";

const backendRestUrlRoot = environment.serverUrl;
const classificatorsEndpoint = "classificators";

@Injectable()
export class BackAPI {

  constructor(private http: Http) {
  }

  classificatorTypes(): Promise<any> {
    return this.get(`${classificatorsEndpoint}/`);
  }

  classificatorTopItems(classificator: string): Promise<any> {
    return this.get(`${classificatorsEndpoint}/${classificator}`);
  }

  classificatorItem(classificator: string, nodeId: string,  params: Object): Promise<any> {
    return this.get(`${classificatorsEndpoint}/${classificator}/${nodeId}`, params);
  }

  classificatorsBy(query: string, type: string = null): Promise<any> {
    return this.get(`${classificatorsEndpoint}/${type}/search/`, {query: query});
  }

  private get(url: string, params: Object = {}): Promise<any> {
    let headers = new Headers({'Content-Type': 'application/json'});
    const searchParams = this.buildURLSearchParams(params);
    let options = new RequestOptions({
      headers: headers,
      search: searchParams
    });
    console.debug('GET:', `${backendRestUrlRoot}/${url}?${searchParams.toString()}`);
    return this.http.get(`${backendRestUrlRoot}/${url}`, options)
        .toPromise()
        .then(this.extractData)
        .catch(this.handleError);
  }

  private buildURLSearchParams(params: Object): URLSearchParams {
    const urlSearchParams = new URLSearchParams();
    const keys: string[] = Object.keys(params || {}).sort();
    for (let i = 0, len = keys.length; i < len; i++) {
      const key = keys[i];
      const value = params[key];
      if (value === null || value === undefined) {
        continue;
      }
      urlSearchParams.set(key, value);
    }
    return urlSearchParams;
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Promise.reject(errMsg);
  }


}
