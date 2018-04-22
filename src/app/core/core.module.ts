import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './services/api.service';
import { StorageService } from './services/storage.service';
import { STORAGE_APP_KEY } from './tokens/storage-app-key.token';
import { environment } from '../../environments/environment';

@NgModule({
  imports: [],
  declarations: [],
  providers: [
    HttpClientModule,
    ApiService,
    StorageService,
    { provide: STORAGE_APP_KEY, useValue: environment.appName }
  ]
})
export class CoreModule {
}
