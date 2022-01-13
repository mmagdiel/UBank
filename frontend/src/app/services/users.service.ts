import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUsers } from '../models/users';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private root: string = '';
  constructor(private http: HttpClient) {
    this.root = environment.root;
  }
  addUser(body: IUsers) {
    console.log(body);
    return this.http.post(`${this.root}/users`, body);
  }
}
