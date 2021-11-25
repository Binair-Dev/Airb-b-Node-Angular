import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../_models/user';
import { SessionStorageService } from './session-storage.service';
import { sha256 } from '../_tools/password-hash';

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

  getAll() {
    return this.httpClient.get<User[]>(this.AUTH_SERVER + "/api/user");
  } 

  getByEmail(mail: String) {
    return this.httpClient.get<User>(this.AUTH_SERVER + "/api/user/" + mail);
  } 

  async login(form) {
    form.value.Password = await sha256(form.value.Password).finally(() => {
      this.getByEmail(form.value.Email).toPromise().then(resp => {
        if (resp.Password == form.value.Password) {
          this.setUser(JSON.stringify(resp));
          this.isLogged.next(true);
        }
      });
    });
  }

  logout() {
    this.isLogged.next(false);
    this.sessionStorage.delete('user');
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