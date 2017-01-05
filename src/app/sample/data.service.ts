import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { Post } from './post';

// Environments based api connetion, no proxy :)
const URL = environment.api;

@Injectable()
export class DataService {
  private postUrl = URL + '/posts';

  constructor(private http: Http) {
    console.log(this.postUrl);
  }

  getData(): Observable<Post[]> {
    // Some basic rxjs operators
    // https://gist.github.com/btroncone/d6cf141d6f2c00dc6b35
    // most usefull - decounceTime, delayWhen, retryWhen, scan, switchMap, toPromise
    // https://angular.io/docs/ts/latest/guide/server-communication.html#!#more-observables
    return this.http.get(this.postUrl).map(this.extractData).catch(this.handleError);
  }

  addPost(post: Post) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.postUrl, post, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /**
   * Here should be any model mapping functionality :)
   *
   * @param {Response} res
   * @returns
   *
   * @memberOf DataService
   */
  extractData(res: Response) {
    let body = res.json();
    return body || [];
  }


  /**
   * This plain and simple error handling. In error var we have both status and message.
   * Any 309, 403, 404, 500 can be done here.
   *
   * @private
   * @param {(Response | any)} error
   * @returns
   *
   * @memberOf DataService
   */
  private handleError(error: Response | any) {

    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }


}
