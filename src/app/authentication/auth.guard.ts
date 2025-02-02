import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  isLoginFlag:any;
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.isLoginFlag = sessionStorage.getItem("isLoggedIn");
    if (this.isLoginFlag === null) {
      return this.router.createUrlTree(['/login']);
    } 
    else { return true; }
  }
}
