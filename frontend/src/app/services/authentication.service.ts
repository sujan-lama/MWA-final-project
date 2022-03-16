import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

const BASE_URL = "http://localhost:3000/api/users"

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private client: HttpClient) {
  }

  login(body: { email: string; password: string }) {
    return this.client.post(BASE_URL + '/login', body);
  }

  isEmailUnique(email: string) {
    return this.client.get(BASE_URL + `/verify/${email}`);
  }
}
