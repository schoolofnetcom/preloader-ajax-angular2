import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppSharedComponentsModule } from '../app/app-shared-components.module';
import { AppHttpService } from '../app/app-http.service';
import { FormsModule } from '@angular/forms';

import { AccountsComponent } from './accounts.component';
import { AccountsEditComponent } from './accounts-edit.component';
import { AccountsNewComponent } from './accounts-new.component';
import { AccountsViewComponent } from './accounts-view.component';

const appRoutes: Routes = [
  {path: 'accounts', component: AccountsComponent},
  {path: 'accounts/new', component: AccountsNewComponent},
  {path: 'accounts/:id', component: AccountsViewComponent},
  {path: 'accounts/:id/edit', component: AccountsEditComponent},
];

@NgModule({
  imports: [
    AppSharedComponentsModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
  ],
  declarations: [
    AccountsComponent,
    AccountsEditComponent,
    AccountsNewComponent,
    AccountsViewComponent,
  ],
  //bootstrap: [],
  providers: [ AppHttpService ],
})

export class AccountsModule {}
