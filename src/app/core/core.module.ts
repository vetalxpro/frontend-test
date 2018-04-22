import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './services/api.service';
import { StorageService } from './services/storage.service';

@NgModule({
  imports: [],
  declarations: [],
  providers: [
    HttpClientModule,
    ApiService,
    StorageService
  ]
})
export class CoreModule {
}
