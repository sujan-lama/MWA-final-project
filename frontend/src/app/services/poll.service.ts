import { HttpClient } from "@angular/common/http";
import { Injectable, NgModule } from "@angular/core";
import { Observable } from "rxjs";


@Injectable()
export class PollService {

  constructor(private http: HttpClient) {

  }

  createPoll(value: {}): Observable<any> {
    return this.http.post('http://localhost:3000/api/poll', value);
  }

}
