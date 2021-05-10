import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { map } from "rxjs/operators";
import { FindCourseService } from '../findcourse/findcourse.service';
import * as bootstrap from "bootstrap";
declare var $ :any;

@Component({
  selector: 'app-playcourse',
  templateUrl: './playcourse.component.html',
  styleUrls: ['./playcourse.component.css']
})
export class PlaycourseComponent implements OnInit {

  courseList: any = [];
  courseListSub: any = [];
  detailedCourseList: any = [];
  showSubTable = false;
  courseVideo: any = [];
  courseContent: string;
  courseToPlay: string;
  userSelectedCourse: string;
  serverError: boolean = false;

  constructor(private http: HttpClient, private findcourseservice:FindCourseService, private elRef: ElementRef) { }

  ngOnInit()
  {
    this.displayCourseList();

    if(this.courseToPlay == '' || this.courseToPlay == null || this.courseToPlay == undefined)
    {
      this.courseToPlay = '1. Introduction.mp4';
    }
  }

  displayCourseList()
  {
      const params = new HttpParams().set('id', this.findcourseservice.getUserSelected());
      this.http.get('https://www.udemy-leaks.com:443/api/getCourseList', {params})
      .pipe(map (responseData => {
          return responseData;
      }))
      .subscribe(response => {
        this.courseList = response;
        this.courseList = this.courseList.sort();
      }
      , error => {
          this.serverError = true;
          this.showserverAlert();
      })
  }

  displaySubCourseList(userSelect: string)
  {
    const params = new HttpParams().set('id', userSelect);

    this.http.get('https://www.udemy-leaks.com:443/api/getSubCourseList', {params})
    .pipe(map(responseData => {
      return responseData;
    }))
    .subscribe(response => {
      this.courseListSub = response;
      this.courseListSub = this.courseListSub.sort();
    }
    , error => {
        this.serverError = true;
        this.showserverAlert();
    })
  }

  openDetailedCourse(course)
  {
    this.courseContent = course;
    const params = new HttpParams().set('id', this.findcourseservice.getUserSelected()).set('id2', this.courseContent);
    this.http.get('https://www.udemy-leaks.com:443/api/showSubCourse', {params})
    .pipe(map(responseData => {
      return responseData;
    }))
    .subscribe(response => {
        this.detailedCourseList = response;
    }
    , error => {
        this.serverError = true;
        this.showserverAlert();
    })
  }

  showSubData()
  {
    this.showSubTable = true;
  }

  playCourse(courseToPlay: any)
  {
    this.userSelectedCourse = this.findcourseservice.getUserSelected();
    this.courseToPlay = courseToPlay;
  }

  renewVideo()
  {
    const player = this.elRef.nativeElement.querySelector('video');
    if(this.courseToPlay.includes('.zip'))
    {
      this.fetchFileToDownload();
    }
    else
    {
      player.load();
    }
  }

  fetchFileToDownload()
  {
    const params = new HttpParams().set('id', this.userSelectedCourse)
                  .set('id2', this.courseContent).set('id3', this.courseToPlay);

    this.http.get('https://www.udemy-leaks.com:443/api/downloadFile', {params, responseType: "blob"})
    .subscribe(response => {

      this.downloadFile(response, "application/zip");
    })
  }

  downloadFile(data: any, type: string)
  {
    let blob = new Blob([data], {type: type});
    let url = window.URL.createObjectURL(blob);
    let pwa = window.open(url);

    if(!pwa || pwa.closed || typeof pwa.closed == "undefined")
    {
      alert("Please disable your pop up blocker and try again.");
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


}
