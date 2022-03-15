import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './modules/home/home.component';
import {LoginGuard} from "./guards/login.guard";
import {AuthGuard} from "./guards/auth.guard";

const router: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {
    path: 'login',
    loadChildren: () =>
      import('./modules/login/login.module').then((module) => module.LoginModule),
    canActivate: [LoginGuard]
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuard]
  },
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(router)],
  exports: [],
  declarations: [HomeComponent],
  providers: [],
})
export class AppRouterModule {
}
