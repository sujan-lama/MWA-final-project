import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "../../services/token-storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-nav',
  template: `
    <div class="nav">
      <ul>
        <li style="float:right">
          <a (click)="logout()" [routerLink]="['/', 'login']">Logout</a>
        </li>
      </ul>
    </div>

  `
})
export class AdminNavComponent implements OnInit {
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
