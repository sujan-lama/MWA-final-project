import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {Poll} from "./model";


@Injectable()
export class VoteService {

  constructor(private http: HttpClient) {
  }

  findById(id?: string | null): Observable<Poll>{
    if(!id){
      return of();
    }
    return this.http.get(`http://locahost:3000/vote/${id}`);
  }
  vote(id?: string,value?: {}): Observable<any> {
    return this.http.post(`http://localhost:3000/vote/${id}`, value);
  }
}
