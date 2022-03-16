import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "./services/token-storage.service";
import {Router} from "@angular/router";
import {userStore} from "./store/store";
import {GlobalStateService} from "./services/global-state.service";
import {clear} from "./store/actions";
import {DEFAULT_STORAGE, STORAGE} from "./globalConstants";

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
  `,
})
export class AppComponent implements OnInit {
  title = 'mwa-final-project';
  isLoggedIn = false;

  constructor(private tokenStorage: TokenStorageService, private router: Router) {
  }

  logout() {
    this.clearUserState();
    // console.log("It is not navigating");
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    this.readUserState();
  }

  isEmptyObject(obj : any){
    return JSON.stringify(obj) === '{}';
  }

  private readUserState() {
     if(DEFAULT_STORAGE == STORAGE.GLOBAL_STATE)
       this.viaGlobalState()
    else
      this.viaLocalStorage();
  }

  private clearUserState() {
    if(DEFAULT_STORAGE == STORAGE.GLOBAL_STATE)
      userStore.dispatch(clear())
    else
      this.tokenStorage.clear();
    return;
  }

  viaLocalStorage(){
    this.isLoggedIn = !!this.tokenStorage.getToken();
    this.tokenStorage.isLoggedInEmitter.subscribe(v => this.isLoggedIn = v);
  }
  viaGlobalState(){
    this.isLoggedIn = !this.isEmptyObject(userStore.getState().user);
    userStore.subscribe(()=> this.isLoggedIn = !this.isEmptyObject(userStore.getState().user));
  }

}
