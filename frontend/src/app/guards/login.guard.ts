import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {TokenStorageService} from "../services/token-storage.service";
import {RoutingService} from "../services/routing.service";

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(
    private tokenStorage: TokenStorageService,
    private routingService: RoutingService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const user = this.tokenStorage.getUser();
    if (user === null) {
      return true;
    }
    this.routingService.loginSuccessRoute();
    return false;
  }

}
