import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ApiService {

  constructor( private http: HttpClient ) {
  }

  get( url: string, options: any = {} ): Observable<any> {
    return this.http.get(url, options);
  }

  post( url: string, data: any = {}, options: any = {} ): Observable<any> {
    return this.http.post(url, data, options);
  }

  patch( url: string, data: any = {}, options: any = {} ): Observable<any> {
    return this.http.post(url, data, options);
  }

  put( url: string, data: any = {}, options: any = {} ): Observable<any> {
    return this.http.post(url, data, options);
  }

  delete( url: string, options: any = {} ): Observable<any> {
    return this.http.delete(url, options);
  }

}
