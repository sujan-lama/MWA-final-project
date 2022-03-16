import {EventEmitter, Injectable} from '@angular/core';
import User from '../models/users';

const TOKEN_KEY = 'token';
const USER_KEY = 'user';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  constructor() {
  }

  isLoggedInEmitter = new EventEmitter<boolean>();

  saveToken(token: string) {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY, token);
  }

  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  }

  saveUser(user: any) {
    localStorage.removeItem(USER_KEY);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    this.isLoggedInEmitter.emit(true);
  }

  getUser(): User | null {
    const user = localStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user) as User;
    }
    return null;
  }

  clear() {
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.clear();
    this.isLoggedInEmitter.emit(false);
  }
}
