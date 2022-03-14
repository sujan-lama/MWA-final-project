import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private client: HttpClient) {}

  login(body: { email: string; password: string }) {
    return this.client.post('http://localhost:3000/api/users/login', body);
  }

  isEmailUnique(email: string) {
    return this.client.get(`http://localhost:3000/api/users/verify/${email}`);
  }

  signup(body: { name: string; email: string; password: string }) {
    return this.client.post('http://localhost:3000/api/users/signup', body);
  }
}
