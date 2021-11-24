import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  AUTH_SERVER = "http://127.0.0.1:5400";

  constructor(private httpClient: HttpClient) {

  }

  register(user: User): Observable<User> {
    return this.httpClient.post<User>(this.AUTH_SERVER + "/api/user", user);
  } 

  getAll() {
    return this.httpClient.get<User[]>(this.AUTH_SERVER + "/api/user");
  } 

  getByEmail(mail: String) {
    return this.httpClient.get<User>(this.AUTH_SERVER + "/api/user/" + mail);
  } 

  login(user: User) {
    
  }

  logout() {

  }

  isAuthenticated() {
    
  }
}