import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import User from "../../models/users";

@Component({
  selector: 'app-userdialog',
  templateUrl: './userdialog.component.html',
  styleUrls: ['./userdialog.component.css']
})
export class UserdialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: User) { }

  ngOnInit(): void {
  }

}
