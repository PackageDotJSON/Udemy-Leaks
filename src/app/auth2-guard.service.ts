import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Login } from "./login/login.service";


@Injectable()
export class AuthGuard2 implements CanActivate
{
  constructor(private login: Login, private router: Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : boolean
  {
    if(this.login.isAuthenticated() == false)
    {
      return true;
    }
    this.router.navigateByUrl('/');
    return false;
  }

}
