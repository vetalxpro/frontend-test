import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {
  private appKey = 'test_front';

  constructor() {
  }

  setItem( key: string, data: any ) {
    localStorage.setItem(this.getKey(key), JSON.stringify(data));
  }

  getItem( key: string ): any {
    return JSON.parse(localStorage.getItem(this.getKey(key)));
  }

  removeItem( key: string ) {
    localStorage.removeItem(this.getKey(key));
  }

  clear() {
    localStorage.clear();
  }


  private getKey( key: string ) {
    return `${this.appKey}.${key}`;
  }

}
