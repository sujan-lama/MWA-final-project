import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {AuthorizationInterceptor} from './interceptors/authorization.interceptor';
import {HomeComponent} from './modules/home/home.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import { AgGridModule } from '@ag-grid-community/angular';
import {MatDialogModule} from "@angular/material/dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CustomDialogModule} from "./custom-dialog/custom-dialog.module";
import {AuthGuard} from "./guards/auth.guard";

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule, // required animations module
    AgGridModule,
    ToastrModule.forRoot(),
    CustomDialogModule,
    RouterModule.forRoot([
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'home', component: HomeComponent},
      {
        path: 'login',
        loadChildren: () =>
          import('./modules/login/login.module').then((module) => module.LoginModule),
      },
      {
        path: 'add-user',
        loadChildren: () =>
          import('./modules/add-user/add-user.module').then(
            (module) => module.AddUserModule
          ),
      },
      {
        path: 'admin-home',
        loadChildren: () =>
          import('./modules/admin-home/admin-home.module').then(
            (module) => module.AdminHomeModule
          ),
        canActivate: [AuthGuard],
      },
      {path: '**', redirectTo: ''},
    ]),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorizationInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
