import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Observable} from 'rxjs';
import {TokenStorageService} from '../services/token-storage.service';
import {RoutingService} from "../services/routing.service";

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
    const user = this.tokenStorage.getUser();
    if (user === null) {
      this.toastr.error('Not authorized');
      this.tokenStorage.clear();
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
