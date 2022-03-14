import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {map} from 'rxjs';
import Response from '../../models/response';
import {TokenStorageService} from '../../services/token-storage.service';
import {UserService} from '../../services/user.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-protected',
  template: `
    <div style="padding:16px">
      <p>protected works!</p>
      {{ data }}
    </div>
  `,
  styles: [],
})
export class ProtectedComponent implements OnInit {
  data: string = '';

  constructor(
    private service: UserService,
    private tokenStorage: TokenStorageService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.fetchData();
  }

  fetchData() {
    this.service
      .getProtected()
      .pipe(map((v) => v as Response))
      .subscribe((v) => {
          this.data = v.data.secret;
        },
        error => {
          this.toastr.error(error.error.message);
          this.router.navigate(['/login'])
        });
  }

  ngOnInit(): void {
  }
}
