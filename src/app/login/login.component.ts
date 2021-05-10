import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { Login } from "./login.service";
import { Router } from '@angular/router';
import { animate, state, style, transition, trigger } from "@angular/animations";
import * as bootstrap from "bootstrap";
declare var $ :any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('Enter', [
      state('flyIn', style ({transform: 'translateX(0)'})),
      transition(':enter', [
        style ({transform: 'translateX(-300%)'}),
        animate('1.0s ease-out')
      ])
    ])
  ]
})
export class LoginComponent implements OnInit {

  serverError: boolean = false;
  logInSuccess: boolean = false;
  logInFailure: boolean = false;
  buttonClicked : boolean = false;
  emptyInput: boolean = false;

  constructor(private http: HttpClient, private auth: Login, private router: Router) { }

  ngOnInit(): void {
  }

  logIn(form: NgForm)
  {
    if(form.value.usermail.length == 0 || form.value.passcode.length == 0)
    {
      this.emptyInput = true;
      this.showEmptyAlert();
    }
    else
    {
      this.emptyInput = false;
      this.buttonClicked = true;
      const mail  = form.value.usermail;
      this.http.post('https://www.udemy-leaks.com:443/api/login', form.value, {responseType: "text"})
      .subscribe(responseData => {
        if(responseData == 'Successfully logged in')
        {
          this.hidelogFailAlert();
          this.logInSuccess = true;
          this.showlogInAlert();
          this.auth.checkAuthentication(true);
          this.auth.userLoggedInAs(mail);

          setTimeout(() => {
            this.router.navigateByUrl('/');
          }, 1000);
        }
        else if(responseData == 'User login failed')
        {
          this.showlogFailAlert();
          this.logInFailure = true;
          this.auth.checkAuthentication(false);
          this.buttonClicked = false;
        }
      }
      ,error =>{
        this.serverError = true;
        this.showserverAlert();
      });
      form.reset();
    }
  }

  hidelogInAlert()
  {
    $('#logInAlert').hide();
  }

  showlogInAlert()
  {
    $('#logInAlert').show();
  }

  hidelogFailAlert()
  {
    $('#logFailAlert').hide();
  }

  showlogFailAlert()
  {
    $('#logFailAlert').show();
  }


  hideserverAlert()
  {
    $('#serverAlert').hide();
  }

  showserverAlert()
  {
    $('#serverAlert').show();
  }

  hideEmptyAlert()
  {
    $('#emptyAlert').hide();
  }

  showEmptyAlert()
  {
    $('#emptyAlert').show();
  }

}
