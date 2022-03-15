import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from "./services/token-storage.service";
import { Router } from "@angular/router";


@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
  `,
})
export class AppComponent implements OnInit {
  title = 'mwa-final-project';

  ngOnInit(): void {
  }
}
