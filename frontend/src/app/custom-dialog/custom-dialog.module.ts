import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserdialogComponent } from './userdialog/userdialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";



@NgModule({
  declarations: [
    UserdialogComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ]
})
export class CustomDialogModule { }
