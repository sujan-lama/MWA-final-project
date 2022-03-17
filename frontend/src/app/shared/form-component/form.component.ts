import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-component',
  template: `

  <div class="form-group">
  <label>{{label}}<span class="text-danger" *ngIf="required">*</span></label>
      <ng-content></ng-content>
      <div *ngIf="formControl?.touched && hasError()">
      <span *ngIf="formControl?.errors?.['required']" class="text-danger">Required</span>
      <span *ngIf="formControl?.errors?.['date']" class="text-danger">{{formControl?.errors?.['date']}}</span>
      </div>
  </div>
  `
})
export class FormComponent implements OnInit {

  @Input() required = false;
  @Input() label!: string;
  @Input('control') formControl!: AbstractControl | null;

  constructor() {
  }

  ngOnInit(): void {
  }

  hasError() {
    if (this.formControl) {
      return this.formControl!.errors;
    }
    return true;
  }

}
