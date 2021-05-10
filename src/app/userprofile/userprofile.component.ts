import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { animate, state, style, transition, trigger } from "@angular/animations";
import { Login } from "../login/login.service";
declare var $ :any;


@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css'],
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
export class UserprofileComponent implements OnInit {

  userName: string;
  userMail: string;
  userPasscode: string;
  buttonEnabled: boolean = false;
  serverError: boolean = false;
  updatedProfile: boolean = false;

  constructor(private http: HttpClient, private login: Login) { }

  ngOnInit()
  {
    this.userMail  = this.login.isLoggedInAs();
    this.fetchUserData();
  }

  fetchUserData()
  {
    const params = new HttpParams().set('id', this.userMail);
    this.http.get('https://www.udemy-leaks.com:443/api/userdata', {params})
    .subscribe(response => {
      this.userName = response[0].name;
      this.userPasscode = 'password';
    }
    , error => {
      this.serverError = true;
      this.showserverAlert();
    })
  }

  activateButton()
  {
    this.buttonEnabled = true;
  }

  updateUserData()
  {
    const params = new HttpParams().set('id', this.userPasscode).set('id2', this.userMail);
    this.http.put('https://www.udemy-leaks.com:443/api/updateuserdata', null, {params})
    .subscribe(response => {
        if(response == 'Password updated successfully')
        {
          this.updatedProfile = true;
          this.profileUpdatedAlert();
        }
    }
    , error => {
      this.serverError = true;
      this.showserverAlert();
    })
  }

  hideserverAlert()
  {
    $('#serverAlert').hide();
  }

  showserverAlert()
  {
    $('#serverAlert').show();
  }

  profileUpdatedAlert()
  {
    $('updatedProfileAlert').show();
  }

  hideprofileAlert()
  {
    $('updatedProfileAlert').hide();
  }

}
