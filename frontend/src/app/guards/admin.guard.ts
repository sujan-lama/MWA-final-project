import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {userStore} from "../store/store";
import {clear} from "../store/actions";
import {DEFAULT_STORAGE, STORAGE} from "../globalConstants";
import {TokenStorageService} from "../services/token-storage.service";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private router: Router,
    private tokenStorage: TokenStorageService,
    private toastr: ToastrService
  ) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return  DEFAULT_STORAGE == STORAGE.GLOBAL_STATE ? this.viaGlobalState() : this.viaLocalStorage();
  }

  viaLocalStorage() : boolean{
    const user = this.tokenStorage.getUser();
    if (user === null || user.role != 'ADMIN') {
      this.toastr.error('Not authorized');
      this.tokenStorage.clear();
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }

  viaGlobalState() : boolean{
    const user = userStore.getState().user
    if (this.isEmptyObject(user) || user.role != 'ADMIN') {
      this.toastr.error('Not authorized');
      userStore.dispatch(clear());
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

  isEmptyObject(obj : any){
    return JSON.stringify(obj) === '{}';
  }
}
