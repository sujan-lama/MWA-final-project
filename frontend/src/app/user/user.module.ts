import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserRoutingModule} from './user-routing.module';
import {HomeComponent} from "./home/home.component";
import {NavComponent} from "./nav/nav.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgSelectModule} from "@ng-select/ng-select";
import {SharedModule} from "../shared/shared.module";
import {UserService} from "../services/user.service";
import {MatButtonModule} from "@angular/material/button";
import {MatRadioModule} from "@angular/material/radio";
import {MatTabsModule} from "@angular/material/tabs";


@NgModule({
  declarations: [HomeComponent, NavComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    NgSelectModule,
    SharedModule,
    MatButtonModule,
    MatRadioModule,
    FormsModule,
    MatTabsModule
  ],
  providers: [UserService]
})
export class UserModule {
}
