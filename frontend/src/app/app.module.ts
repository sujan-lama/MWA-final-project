import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AuthorizationInterceptor } from './interceptors/authorization.interceptor';
import { HomeComponent } from './modules/home/home.component';
import { IsLoggedInGuard } from './guards/is-logged-in.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
    RouterModule.forRoot([
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      {
        path: 'login',
        loadChildren: () =>
          import('./modules/login/login.module').then((module) => module.LoginModule),
      },
      {
        path: 'signup',
        loadChildren: () =>
          import('./modules/signup/signup.module').then(
            (module) => module.SignupModule
          ),
      },
      {
        path: 'admin-home',
        loadChildren: () =>
          import('./modules/admin-home/admin-home.module').then(
            (module) => module.AdminHomeModule
          ),
        canActivate: [IsLoggedInGuard],
      },
      { path: '**', redirectTo: '' },
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
export class AppModule {}
