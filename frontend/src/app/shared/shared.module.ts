import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormComponent} from "./form-component/form.component";



@NgModule({
  declarations: [FormComponent],
  imports: [
    CommonModule
  ],
  exports:[
    FormComponent
  ]
})
export class SharedModule { }
