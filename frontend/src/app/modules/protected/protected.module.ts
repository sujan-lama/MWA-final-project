import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProtectedComponent } from './protected.component';

@NgModule({
  declarations: [ProtectedComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: ProtectedComponent }]),
  ],
})
export class ProtectedModule {}
