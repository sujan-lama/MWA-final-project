import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private client:HttpClient) { }

  getProtected(){
    return this.client.get("http://localhost:3000/api/protected");
  }

}
