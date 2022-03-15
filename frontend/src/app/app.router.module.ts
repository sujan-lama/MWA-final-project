import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginGuard} from "./guards/login.guard";
import {AuthGuard} from "./guards/auth.guard";
import {AdminGuard} from "./guards/admin.guard";

const router: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},

  {
    path: 'login',
    loadChildren: () =>
      import('./modules/login/login.module').then((module) => module.LoginModule),
    canActivate: [LoginGuard]
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuard, AdminGuard]
  },
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(router)],
  declarations: [],
  providers: [],
})
export class AppRouterModule {
}
