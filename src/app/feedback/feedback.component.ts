import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { animate, state, style, transition, trigger } from "@angular/animations";
import * as bootstrap from "bootstrap";
declare var $ :any;

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css'],
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
export class FeedbackComponent implements OnInit {

  serverError: boolean = false;
  commentSuccess: boolean = false;
  emptyInput: boolean = false;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  addFeedback(form: NgForm)
  {
    if(form.value.email.length == 0 || form.value.comment.length == 0 || form.value.name.length == 0)
    {
      this.emptyInput = true;
      this.showEmptyAlert();
    }
    else
    {
      this.emptyInput = false;
      this.http.post('https://www.udemy-leaks.com:443/api/feedback', form.value, {responseType: "text"})
      .subscribe(responseData => {
        if(responseData == 'Feedback Noted')
        {
          this.commentSuccess = true;
          this.showSuccessAlert();
        }
      }
      ,error => {
        this.serverError = true;
        this.showserverAlert();
      });
      form.reset();
    }
  }

  hideSuccessAlert()
  {
    $('#feedbackAddedAlert').hide();
  }

  showSuccessAlert()
  {
    $('#feedbackAddedAlert').show();
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
