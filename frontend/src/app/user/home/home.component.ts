import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {filter, map} from "rxjs";
import Response from "../../models/response";
import * as moment from "moment";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {

  currentPoll: any[] = []
  userVotedPoll: any[] = []
  selectedVote: any[] = []

  constructor(private userService: UserService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.fetchPoll();
    this.selectedVote.push({pollId: "62325d8721ffaff75260ff7b", foodId: "62325d8721ffaff75260ff7d", foodName: "Dish1"})
  }

  fetchPoll() {
    this.userService.getCurrentPoll().pipe(map(v => v as Response),
      map(v => v.data),
    ).subscribe(v => {
      this.currentPoll = v;
    })

    this.userService.getUserVotedPoll().pipe(map(v => v as Response))
      .subscribe(v => {
        this.userVotedPoll = v.data;
      })
  }

  getTargetedDate(poll: any) {
    return moment(poll.target_date).format("YYYY-MM-DD")
  }

  getStartDate(poll: any) {
    return moment(poll.start_date).format("YYYY-MM-DD hh:mm")
  }

  getExpiryDate(poll: any) {
    return moment(poll.end_date).format("YYYY-MM-DD hh:mm")
  }

  vote(index: number) {
    const selectedVote = this.selectedVote[index];
    this.userService.vote(selectedVote).pipe(map(v => v as Response)).subscribe(v => {
      if (v.success) {
        this.toastr.success("Vote successful");
      }
      this.fetchPoll();
    }, err => {
      this.toastr.error(err.error.message);
    });
  }


  getVotes(options: any) {
    return "Total votes: " + options.votes.length
  }

  getYourVote(poll: any) {
    let value = "";
    const user = this.userService.getUser();
    if (user == null) return value;

    for (let options of poll.foods) {
      const voteArray: any[] = options.votes;
      const userVoted = !!voteArray.find(v => v.email === user.email);
      if (userVoted) {
        value = options.foodItem.name;
      }
    }
    return value;
  }
}
