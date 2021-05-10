import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { HttpClient, HttpParams } from "@angular/common/http";
import { map } from "rxjs/operators";
import { PlaycourseComponent } from '../playcourse/playcourse.component';
import { FindCourseService } from './findcourse.service';
import { animate, state, style, transition, trigger } from "@angular/animations";
import * as bootstrap from "bootstrap";
declare var $ :any;

@Component({
  selector: 'app-findcourse',
  templateUrl: './findcourse.component.html',
  styleUrls: ['./findcourse.component.css'],
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
export class FindcourseComponent implements OnInit {

  searchInDirectory: string;
  courseDisplay: any;
  dataAvailable: boolean = false;
  dataUnavailable: boolean = false;
  serverError: boolean = false;
  emptyInput: boolean = false;

  constructor(private router: Router, private http: HttpClient, private findcourseservice: FindCourseService) { }

  ngOnInit()
  {}

  playCourse(videoPlay: string)
  {
      this.findcourseservice.setUserSelected(videoPlay);
      this.router.navigateByUrl('/playcourse');
  }

  searchCourses()
  {
    if(this.searchInDirectory == undefined || this.searchInDirectory == null)
    {
      this.emptyInput = true;
      this.showEmptyAlert();
    }
    else
    {
      this.emptyInput = false;
      const params = new HttpParams().set('id', this.searchInDirectory);
      this.http.get('https://www.udemy-leaks.com:443/api/coursesList', {params})
      .pipe(map(responseData => {
          return responseData;
      }))
      .subscribe(response => {
        this.courseDisplay = response;
        if(this.courseDisplay.length > 0)
        {
          this.dataAvailable = true;
          this.dataUnavailable = false;
        }
        else
        {
          this.dataUnavailable = true;
          this.dataAvailable = false;
        }
      }
     ,error => {
       this.serverError = true;
       this.showserverAlert();
     })
    }
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
