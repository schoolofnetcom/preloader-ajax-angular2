import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppPaginateComponent } from './app-paginate.component';
import { AppSearchComponent } from './app-search.component';

@NgModule({
  imports: [
    BrowserModule,
  ],
  declarations: [
    AppPaginateComponent,
    AppSearchComponent,
  ],
  exports: [
    AppPaginateComponent,
    AppSearchComponent,
  ]
})

export class AppSharedComponentsModule {}
