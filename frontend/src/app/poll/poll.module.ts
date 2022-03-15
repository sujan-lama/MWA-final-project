import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormComponentModule } from '../form-component/form-component.module';
import { PollComponent } from './poll.component';


const routes: Routes = [{ path: '', component: PollComponent }]


@NgModule({
  declarations: [PollComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
    RouterModule.forChild(routes),
    FormComponentModule
  ]
})
export class PollModule { }
