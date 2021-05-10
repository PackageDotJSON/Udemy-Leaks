import { Component, OnInit } from '@angular/core';
import { Login } from "../login/login.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public login: Login) { }

  ngOnInit(): void
  {}

}
