import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Login } from "./login/login.service";

@Injectable()
export class AuthGuard implements CanActivate{

  constructor(private router: Router, private login: Login){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : boolean
  {
      if(this.login.isAuthenticated())
      {
        return true;
      }
      this.router.navigateByUrl('/login');
      return false;
  }

}
