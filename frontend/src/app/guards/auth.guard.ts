import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree,} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Observable} from 'rxjs';
import {TokenStorageService} from '../services/token-storage.service';
import {userStore} from "../store/store";
import {clear} from "../store/actions";
import {DEFAULT_STORAGE, STORAGE} from "../globalConstants";

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private tokenStorage: TokenStorageService,
    private toastr: ToastrService
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return  DEFAULT_STORAGE == STORAGE.GLOBAL_STATE ? this.viaGlobalState() : this.viaLocalStorage();
  }

  viaLocalStorage() : boolean{
    const user = this.tokenStorage.getUser();
    if (user === null) {
      this.toastr.error('Not authorized');
      this.tokenStorage.clear();
      this.router.navigate(['/login']);
      return false;
    }
    const role = user.role;

    if (route.data['role'] && route.data['role'].indexOf(role) === -1) {
      this.toastr.error('Access Denied');
      this.tokenStorage.clear();
      return false;
    }

    return true;
  }

  viaGlobalState() : boolean{
    if (this.isEmptyObject(userStore.getState().user)) {
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
