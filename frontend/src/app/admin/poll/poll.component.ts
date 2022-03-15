import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {PollService} from "../../services/poll.service";
import {map} from "rxjs";
import Response from "../../models/response";
import * as moment from "moment";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.css']
})
export class PollComponent implements OnInit {

  public form = this.fb.group({
    title: [null, [Validators.required]],
    category: [null, [Validators.required]],
    targetedDate: [null, [Validators.required]],
    startDateTime: [null, [Validators.required]],
    endDateTime: [null, [Validators.required]],
    foodItems: this.fb.array([])
  }, {validators: this.pollDateValidator});

  public categories = ['Breakfast', 'Lunch', 'Dinner', 'Brunch'];
  public foodItems = [];
  todayWithTime: string = moment().format("YYYY-MM-DDThh:mm:ss");                          // 2022-03-15T17:39:55-05:00
  tomorrowWithTime: string = moment().add(1, "days").format("YYYY-MM-DDThh:mm:ss");                          // 2022-03-15T17:39:55-05:00
  tomorrow: string = moment().add(1, "days").format('YYYY-MM-DD');

  constructor(private fb: FormBuilder, private router: Router, private service: PollService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
  }

  addPole() {
    this.form.markAsTouched();
    this.form.markAsDirty();
    if (this.form.invalid) {
      return;
    }
    this.toastr.clear();
    const foodItemsList = this.form.controls['foodItems'].value;
    if (foodItemsList.length < 2) {
      this.toastr.error("Please add more than one food items");
      return;
    }
    const poll = this.form.value;
    const body = {
      title: poll.title,
      start_date: poll.startDateTime,
      end_date: poll.endDateTime,
      targeted_date: poll.targetedDate,
      category: poll.category,
      foods: poll.foodItems
    }
    console.log(body)
    this.service.createPoll(body).pipe(map(v => v as Response))
      .subscribe(res => {
        this.toastr.clear();
        this.toastr.success(res.message);
      }, (err) => {
        this.toastr.error(err.error.message)
      });

  }

  getFormControl(key: string): AbstractControl | null {
    return this.form.get(key);
  }

  onSelectedCategories(itm: any) {
    this.service.getFoodFromCategory(itm).pipe(
      map(v => v as Response),
    ).subscribe(v => {
      this.foodItems = v.data;
    });

  }


  onSelectedFood(itm: any) {
    this.form.controls['foodItems'].markAsTouched();
    if (!itm) {
      return;
    }
    let newArr: FormControl[] = [];
    itm.forEach((element: any) => {
      newArr.push(element);
    });
    this.form.setControl('foodItems', this.fb.array(newArr));
  }

  createItem(val: string) {
    return this.fb.control({name: val});
  }

  goBack() {
    this.router.navigate(['./']);
  }

  pollDateValidator(formGoup: FormGroup) {
    const targetDate = formGoup.get('targetedDate')?.value;
    const startDateTime = formGoup.get('startDateTime')?.value;
    const endDateTime = formGoup.get('endDateTime')?.value;
    if (targetDate) {
      const targetedDateEl = formGoup.get('targetedDate');
      targetedDateEl?.setErrors(null);
      const days = convertToDay(Date.parse(targetDate) - Date.now());
      if (days <= 0) {
        targetedDateEl?.setErrors({'date': 'Date must be after today'});
      }
    }
    if (startDateTime) {
      const startDateTimeEl = formGoup.get('startDateTime');
      startDateTimeEl?.setErrors(null);
      const days = convertToDay(Date.parse(targetDate) - Date.parse(startDateTime));
      if (days <= 0) {
        startDateTimeEl?.setErrors({'date': 'Start Date/Time must be before targetted day'});
      }

      const days1 = convertToDay(Date.parse(startDateTime) - Date.now());
      if (days1 <= 0) {
        startDateTimeEl?.setErrors({'date': 'Start Date/Time must be after today.'});
      }
    }
    if (endDateTime) {
      const endDateTimeEl = formGoup.get('endDateTime');
      endDateTimeEl?.setErrors(null);
      const days = convertToDay(Date.parse(startDateTime) - Date.parse(endDateTime));
      if (days < 0) {
        endDateTimeEl?.setErrors({'date': 'End Date/Time must be after start date/time.'});
      }

      const days1 = convertToDay(Date.parse(targetDate) - Date.parse(endDateTime));
      if (days1 < 0) {
        endDateTimeEl?.setErrors({'date': 'End Date/Time must be before targeted date/time.'});
      }
    }
    return null;
  }


}

function convertToDay(time: number) {
  return Math.round(time / (1000 * 60 * 60 * 24)) + 1;
}


