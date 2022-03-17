import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {TokenStorageService} from "./token-storage.service";


@Injectable()
export class UserService {

  constructor(private http: HttpClient, private tokenStorage:TokenStorageService) {
  }

  findById(id?: string | null) {
    if (!id) {
      return of();
    }
    return this.http.get(`http://locahost:3000/vote/${id}`);
  }

  vote(selectedVote: { pollId: string, foodId: string }): Observable<any> {
    const value = {food_id: selectedVote.foodId}
    return this.http.put(`http://localhost:3000/api/polls/${selectedVote.pollId}`, value);
  }

  getCurrentPoll() {
    return this.http.get("http://localhost:3000/api/polls")
  }

  getUserVotedPoll(){
    return this.http.get("http://localhost:3000/api/polls/user");
  }

  getUser(){
    return this.tokenStorage.getUser();
  }

}
