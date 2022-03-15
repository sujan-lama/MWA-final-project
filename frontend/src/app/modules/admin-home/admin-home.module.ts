import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminHomeComponent } from './admin-home.component';
import {MatButtonModule} from "@angular/material/button";
import { AgGridModule } from '@ag-grid-community/angular';

@NgModule({
  declarations: [AdminHomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: AdminHomeComponent}]),
    AgGridModule,
    MatButtonModule
  ],
})
export class AdminHomeModule {}
