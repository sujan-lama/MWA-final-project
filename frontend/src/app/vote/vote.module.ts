import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {VoteComponent} from "./vote.component";
import {ReactiveFormsModule} from "@angular/forms";
import {FormComponentModule} from "../form-component/form-component.module";
import {NgSelectModule} from "@ng-select/ng-select";



@NgModule({
  declarations: [VoteComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormComponentModule,
    NgSelectModule
  ]
})
export class VoteModule { }
