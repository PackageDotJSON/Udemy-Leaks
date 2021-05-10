import { Component, OnInit } from '@angular/core';
import * as bootstrap from "bootstrap";
declare var $ :any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  countClick: number = 0;

  constructor() { }

  ngOnInit() {

    $('.carousel').carousel();

  }

  displayMoreCourses()
  {
    this.countClick += 1;
  }

}
