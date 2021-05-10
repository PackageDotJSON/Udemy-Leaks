import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { HttpClient, HttpParams } from "@angular/common/http";
import * as bootstrap from "bootstrap";
declare var $ :any;
import { animate, state, style, transition, trigger } from "@angular/animations";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
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
export class RegisterComponent implements OnInit {

  registration: boolean = false;
  serverError: boolean = false;
  userAdded : boolean = false;
  emptyInput: boolean = false;

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }

  addNewUser(form : NgForm)
  {
    if(form.value.fullname.length == 0 || form.value.usermail.length == 0 || form.value.passcode.length == 0)
    {
      this.emptyInput = true;
      this.showEmptyAlert();
    }
    else
    {
      this.emptyInput = false;
      this.http.post('https://www.udemy-leaks.com:443/api/registration', form.value, {responseType: "text"})
      .subscribe(responseData => {
        if(responseData == 'User already exists')
        {
          this.registration = true;
          this.showAlert();
        }
        else
        {
          this.userAdded = true;
          this.showUserAlert();
        }
      }
      , error => {
        this.serverError = true;
        this.showserverAlert();
      });
      form.reset();
    }
  }

  hideAlert()
  {
    $('#registrationAlert').hide();
  }

  showAlert()
  {
    $('#registrationAlert').show();
  }

  hideUserAlert()
  {
    $('#userAddedAlert').hide();
  }

  showUserAlert()
  {
    $('#userAddedAlert').show();
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
