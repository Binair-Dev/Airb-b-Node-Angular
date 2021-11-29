import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { AuthService } from './auth.service';
import { Property } from '../_models/property';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  AUTH_SERVER = "http://127.0.0.1:5400";

  constructor(private httpClient: HttpClient, private authService: AuthService) {
  } 
  getAll() {
    return this.httpClient.get<Property[]>(this.AUTH_SERVER + "/api/property", {headers: {'Authorization':'Bearer ' + JSON.parse(this.authService.getToken()).accessToken}}).toPromise();
  } 
  getByPropertyId(id: string) {
    return this.httpClient.get<Property>(this.AUTH_SERVER + "/api/findProperty/" + id).toPromise();
  } 

  validateProperty(property: any) {
    return this.httpClient.put<Property[]>(this.AUTH_SERVER + "/api/property/" + property._id, property, {headers: {'Authorization':'Bearer ' + JSON.parse(this.authService.getToken()).accessToken}}).toPromise();
  }
  deleteProperty(property: any) {
    return this.httpClient.delete<Property[]>(this.AUTH_SERVER + "/api/property/" + property._id, {headers: {'Authorization':'Bearer ' + JSON.parse(this.authService.getToken()).accessToken}}).toPromise();
  }
  register(property: any) {
    return this.httpClient.post(this.AUTH_SERVER + "/api/property", property, {headers: {'Authorization':'Bearer ' + JSON.parse(this.authService.getToken()).accessToken}}).toPromise();
  }

  updateProperty(property: any) {
    return this.httpClient.put<Property>(this.AUTH_SERVER + "/api/property/" + property._id, property, {headers: {'Authorization':'Bearer ' + JSON.parse(this.authService.getToken()).accessToken}}).toPromise();
  }

  registerContract(contract: any) {
    return this.httpClient.post(this.AUTH_SERVER + "/api/contract", contract, {headers: {'Authorization':'Bearer ' + JSON.parse(this.authService.getToken()).accessToken}}).toPromise();
  }
}
