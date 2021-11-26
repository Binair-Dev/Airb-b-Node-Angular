import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../_models/user';
import { SessionStorageService } from './session-storage.service';
import { JwtResponse } from '../_models/jwt-response';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  AUTH_SERVER = "http://127.0.0.1:5400";
  isLogged:BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private httpClient: HttpClient, private sessionStorage: SessionStorageService) {

  }

  register(user: User): Observable<User> {
    return this.httpClient.post<User>(this.AUTH_SERVER + "/api/user", user);
  } 

  login(user: any): Observable<any> {
    return this.httpClient.post(this.AUTH_SERVER + "/api/login", user);
  } 

  deleteUser(userId: String): Observable<any> {
    return this.httpClient.delete(this.AUTH_SERVER + "/api/user/" + userId);
  } 

  updateUser(userId: String, user: any): Observable<any> {
    return this.httpClient.put(this.AUTH_SERVER + "/api/user/" + userId, user);
  } 

  getAll() {
    return this.httpClient.get<User[]>(this.AUTH_SERVER + "/api/user");
  } 

  getByEmail(mail: String) {
    return this.httpClient.get<User>(this.AUTH_SERVER + "/api/user/" + mail);
  } 

  logout() {
    this.isLogged.next(false);
    this.sessionStorage.delete('user');
    this.sessionStorage.delete('accessToken');
  }

  isAuthenticated() {
    return this.isLogged.value;
  }

  getUser() {
    return this.sessionStorage.get('user');
  }

  setUser(user: any) {
    this.sessionStorage.set('user', user);
  }
}