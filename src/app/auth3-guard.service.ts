import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { FindCourseService } from './findcourse/findcourse.service';


@Injectable()
export class AuthGuard3 implements CanActivate
{
  constructor(private findcourseservice: FindCourseService, private router: Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : boolean
  {
    if(this.findcourseservice.getUserSelected() === '' || this.findcourseservice.getUserSelected() === null ||
       this.findcourseservice.getUserSelected() === undefined)
       {
         this.router.navigateByUrl('/findcourse');
         return false;
       }
    return true;
  }
}
