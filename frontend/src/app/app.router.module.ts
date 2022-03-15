

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsLoggedInGuard } from './guards/is-logged-in.guard';
import { HomeComponent } from './modules/home/home.component';

const router: Routes = [
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
    path: 'protected',
    loadChildren: () =>
      import('./modules/protected/protected.module').then(
        (module) => module.ProtectedModule
      ),
    canActivate: [IsLoggedInGuard],
  },
  {
    path: 'poll',
    loadChildren: () => import('./poll/poll.module').then((m) => m.PollModule)
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(router)],
  exports: [],
  declarations: [HomeComponent],
  providers: [],
})
export class AppRouterModule { }
