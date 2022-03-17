import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {AgGridModule} from "@ag-grid-community/angular";
import {MatButtonModule} from "@angular/material/button";
import {AdminHomeComponent} from './admin-home/admin-home.component';
import {MatDialogModule} from "@angular/material/dialog";
import {AddUserComponent} from './add-user/add-user.component';
import {ReactiveFormsModule} from "@angular/forms";
import {UserdialogComponent} from "./userdialog/userdialog.component";
import {PollService} from "../services/poll.service";
import {AdminService} from "../services/admin.service";
import {PollComponent} from "./poll/poll.component";
import {NgSelectModule} from "@ng-select/ng-select";
import {AdminNavComponent} from "./admin-nav/admin-nav.component";
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [
    AdminHomeComponent,
    AddUserComponent,
    UserdialogComponent,
    PollComponent,
    AdminNavComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    AgGridModule,
    MatButtonModule,
    MatDialogModule,
    NgSelectModule,
    SharedModule

  ],
  exports: [
    AdminNavComponent
  ],
  providers: [PollService, AdminService]
})
export class AdminModule {
}
