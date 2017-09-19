import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Repository } from '../repository'
import 'rxjs/add/operator/toPromise';

@Injectable()
export class RepositoryService {
  private serverUrl: string = 'http://59.27.101.61:3000/repository';

  constructor (private http: Http) {}

  getRepositories(): Promise<Repository[]> {
  return this.http.get(this.serverUrl)
             .toPromise()
             .then(response => response.json() as Repository[])
             .catch(this.handleError);
}

  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Promise.reject(errMsg);
  }
}

