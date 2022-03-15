import {Injectable, OnDestroy, OnInit} from '@angular/core';
import {IUser} from "../store/IUser";
import {userStore} from "../store/store";
import {Unsubscribe} from "redux";

@Injectable({
  providedIn: 'root'
})
export class GlobalStateService implements OnInit, OnDestroy{
  user! : IUser
  unsubscribe! : Unsubscribe
  constructor() { }

  ngOnInit(): void {
    userStore.subscribe(()=> this.user = userStore.getState().user)
  }

  getToken(){
    return this.isAuthenticated() ? this.user.token : null;
  }

  getEmail(){
    return this.isAuthenticated() ? this.user.email : null;
  }

  getUser(){
    return this.isAuthenticated() ? this.user : null;
  }

  getRole(){
    return this.isAuthenticated() ? this.user.role : null;
  }

  isAuthenticated(){
    return this.isEmptyObject(this.user);

  }

   isEmptyObject(obj : any){
    return JSON.stringify(obj) === '{}';
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }
}
