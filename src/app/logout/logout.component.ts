import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Login } from "../login/login.service";


@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private login: Login, private router: Router) { }

  ngOnInit()
  {
    this.login.checkAuthentication(false);
    this.router.navigateByUrl('/home');
  }

}
