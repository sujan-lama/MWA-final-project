import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from "./services/token-storage.service";
import { Router } from "@angular/router";


@Component({
  selector: 'app-root',
  template: `
    <div class="nav">
      <ul>
        <li *ngIf="!isLoggedIn" style="float:right"><a [routerLink]="['/', 'login']">Login</a></li>
        <li *ngIf="isLoggedIn" style="float:right">
          <a (click)="logout()" [routerLink]="['/', 'login']">Logout</a>
        </li>
      </ul>
    </div>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent implements OnInit {
  title = 'mwa-final-project';
  isLoggedIn = false;

  constructor(private tokenStorage: TokenStorageService, private router: Router) {
  }

  logout() {
    this.tokenStorage.clear();
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorage.getToken();
    this.tokenStorage.isLoggedInEmitter.subscribe(v => this.isLoggedIn = v);
  }
}
