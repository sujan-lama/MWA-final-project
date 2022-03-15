import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {TokenStorageService} from "./token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class RoutingService {

  constructor(private tokenStorage: TokenStorageService, private router: Router) {
  }

  loginSuccessRoute() {
    const user = this.tokenStorage.getUser();
    if (user == null) {
      this.router.navigate(['/login']);
      return;
    }
    switch (user.role) {
      case "ADMIN":
        this.router.navigate(['/admin']);
        break;
      default:
        this.router.navigate(['/user']);
    }
  }
}
