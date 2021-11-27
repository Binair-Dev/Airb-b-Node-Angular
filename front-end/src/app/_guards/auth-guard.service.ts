import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{


  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let url: string = state.url;
    return this.canAccess(next, url);
  }

  canAccess(route: ActivatedRouteSnapshot, url: any): any {
    // if (this.authService.isLogged) {
    //   let user = JSON.parse(this.authService.getUser());

    //   let resp = this.authService.getByEmail(user.Email).toPromise().then(data => {
    //     let isAdmin = user.isAdmin;
    //     let isDecodedAdmin = JSON.parse(JSON.stringify(decode(user.Token))).isAdmin;

    //     if (isDecodedAdmin !== isAdmin) {
    //       this.router.navigateByUrl('logout');
    //       return false;
    //     }
    //     if(user.isAdmin !== data.isAdmin) {
    //       this.router.navigateByUrl('logout');
    //       return false;
    //     }
    //     return true;
    //   });
    //   return resp;
    // }
    // return false;
    return true;
  }
}