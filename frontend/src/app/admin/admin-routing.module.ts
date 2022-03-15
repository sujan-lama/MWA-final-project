import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminHomeComponent} from "./admin-home/admin-home.component";
import {AddUserComponent} from "./add-user/add-user.component";
import {PollComponent} from "./poll/poll.component";


const routes: Routes = [
  {
    path: 'poll',
    component: PollComponent
  },
  {
    path: 'add-user',
    component: AddUserComponent
  },
  {
    path: 'home',
    component: AdminHomeComponent
  },
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
