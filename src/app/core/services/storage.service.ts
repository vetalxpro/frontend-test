import { Inject, Injectable } from '@angular/core';
import { STORAGE_APP_KEY } from '../tokens/storage-app-key.token';

@Injectable()
export class StorageService {

  constructor( @Inject(STORAGE_APP_KEY) private appKey: string ) {
  }

  setItem( key: string, data: any ) {
    localStorage.setItem(this.getKey(key), JSON.stringify(data));
  }

  getItem( key: string ): any {
    try {
      return JSON.parse(localStorage.getItem(this.getKey(key)));
    } catch ( err ) {
      console.log(err);
      return null;
    }
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
