import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserRoutingModule} from './user-routing.module';
import {HomeComponent} from "./home/home.component";
import {NavComponent} from "./nav/nav.component";
import {AppModule} from "../app.module";


@NgModule({
  declarations: [HomeComponent, NavComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    AppModule
  ]
})
export class UserModule {
}
