import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import Response from '../../models/response';
import {map} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {AuthenticationService} from '../../services/authentication.service';
import {TokenStorageService} from '../../services/token-storage.service';
import {RoutingService} from "../../services/routing.service";
import {userStore} from "../../store/store";
import {saveUser} from "../../store/actions";
import {DEFAULT_STORAGE, STORAGE} from "../../globalConstants";

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private tokenStorage: TokenStorageService,
    private routingService: RoutingService,
    private toastr: ToastrService

  ) {
    this
      .loginForm = formBuilder.group({
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(
            /^[\w]{1,}[\w.+-]{0,}@[\w-]{1,}([.][a-zA-Z]{2,}|[.][\w-]{2,}[.][a-zA-Z]{2,})$/
          ),
        ]),
      ],
      password: ['', Validators.compose([Validators.required])],
    });
  }
  onSubmit() {
    this.authenticationService
      .login(this.loginForm.value)
      .pipe(map((v) => v as Response))
      .subscribe((v) => {
          if (!v.success) {
            this.toastr.error(v.message);
            return;
          }
          this.saveState(v);
          this.toastr.clear();
          this.toastr.success(v.message);
          this.routingService.loginSuccessRoute();
        },
        error => {
          this.toastr.error(error.error.message);
        });
  }

  ngOnInit()
    :
    void {
  }
  saveState(value: any){
    if(DEFAULT_STORAGE == STORAGE.GLOBAL_STATE) this.viaGlobalState(value);
    else this.viaLocalStorage(value);
  }
  viaLocalStorage(v: any){
    this.tokenStorage.saveToken(v.data.token);
    this.tokenStorage.saveUser(v.data);
  }
  viaGlobalState(v: any){
    userStore.dispatch(saveUser(v.data))
  }
}
