

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import {AuthGuard} from "./guards/auth.guard";

const router: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'login',
    loadChildren: () =>
      import('./modules/login/login.module').then((module) => module.LoginModule),
  },
  {
    path: 'poll',
    loadChildren: () => import('./poll/poll.module').then((m) => m.PollModule)
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
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(router)],
  exports: [],
  declarations: [HomeComponent],
  providers: [],
})
export class AppRouterModule { }
