import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, CanLoad, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
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

  canAccess(route: ActivatedRouteSnapshot, url: any): boolean {
    if (this.authService.isLogged) {
      let user = JSON.parse(this.authService.getUser());

      let isAdmin = user.isAdmin;
      let isDecodedAdmin = JSON.parse(JSON.stringify(decode(user.Token))).isAdmin;

      if (isDecodedAdmin !== isAdmin) {
        this.router.navigateByUrl('logout');
        return false;
      }
      return true;
    }
    return false;
  }
}