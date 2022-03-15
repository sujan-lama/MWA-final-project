import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Poll} from "./model";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {VoteService} from "./vote.service";
import {switchMap} from "rxjs";

@Component({
  selector: 'app-vote',
  template: `

    <div class="container" *ngIf="form">
      <form [formGroup]="form" #pForm="ngForm">
        <div class="col-12 row">

          Title<label>{{poll.title}}</label><br/>
          Category<label>{{poll.category}}</label><br/>
          Targeted Date<label>{{poll.targetedDate | date}}</label><br/>
          Starting Date Time<label>{{poll.startDateTime | date}}</label><br/>
          Ending Date Time<label>{{poll.endDateTime | date}}</label><br/>

          <app-form-component [required]="true" label="Food Items" [control]="form.get('food')" class="col-6">
            <ng-select [items]="poll.foodItems!" bindLabel="name" bindName="name" formControlName="foodItem">
            </ng-select>
          </app-form-component>
          Ï
          <div class="form-group" class="col-12">
            <button class="btn btn-light" type="button" (click)="goBack()">Cancel</button>
            <button class="btn btn-success ml-4" type="button" (click)="vote()" [disabled]="!form.valid">Submit</button>
          </div>
        </div>
      </form>
    </div>
  `,
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit {

  public form: FormGroup;
  public poll: Poll = {};

  constructor(private fb: FormBuilder, private router: Router, private service: VoteService, private activatedRoute: ActivatedRoute) {
    this.form = this.fb.group({
      foodItem: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(switchMap((mp: ParamMap) => this.service.findById(mp.get('id'))))
      .subscribe((res) => {
        if (res) {
          this.poll = res;
        }
      })
  }

  goBack() {
    this.router.navigate(['/']);
  }

  vote() {
    this.form.markAsDirty();
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }

    this.service.vote(this.poll._id, this.form.value).subscribe(res => {
      console.log('success');
      this.goBack();
    }, (error => {
      console.log('error');
    }))
  }
}
