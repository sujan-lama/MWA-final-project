import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

const BASE_URL = 'http://localhost:3000/api/admin'

@Injectable()
export class AdminService {

  constructor(private client: HttpClient) {
  }

  getUsers() {
    return this.client.get(BASE_URL + "/users");
  }

  addUser(body: { name: string; email: string; password: string, role: string }) {
    body["role"] = "USER";
    return this.client.post(BASE_URL + '/add-user', body);
  }

  deleteUser(email: string) {
    return this.client.delete(BASE_URL+/delete-user/+email);

  }
}
