import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "../../services/token-storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav',
  template: `
    <div class="nav">
      <ul>
        <li>
          <a [routerLink]="['/user','home']">Polls</a>
        </li>
        <li style="float:right">
          <a (click)="logout()" [routerLink]="['/', 'login']">Logout</a>
        </li>
      </ul>
    </div>

  `
})
export class NavComponent implements OnInit {
  title = 'mwa-final-project';

  constructor(private tokenStorage: TokenStorageService, private router: Router) {
  }

  logout() {
    this.tokenStorage.clear();
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
  }
}
