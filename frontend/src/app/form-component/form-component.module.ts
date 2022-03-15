import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponentComponent } from './form-component.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [FormComponentComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [FormComponentComponent]
})
export class FormComponentModule { }
