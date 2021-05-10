import { Component, OnInit } from '@angular/core';
import * as bootstrap from "bootstrap";
declare var $ :any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'hunain';

  isLoading: boolean = true;

  ngOnInit()
  {
    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
  }

  hideCookie()
  {
    $('.toast').toast('hide');
  }

}
