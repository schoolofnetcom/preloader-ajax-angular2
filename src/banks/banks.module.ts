import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppSharedComponentsModule } from '../app/app-shared-components.module';
import { AppHttpService } from '../app/app-http.service';

import { BanksComponent } from './banks.component';

const appRoutes: Routes = [
  {path: 'banks', component: BanksComponent},
];

@NgModule({
  imports: [
    AppSharedComponentsModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes),
  ],
  declarations: [
    BanksComponent,
  ],
  //bootstrap: [],
  providers: [ AppHttpService ],
})

export class BanksModule {}
