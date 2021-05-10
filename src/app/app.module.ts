import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { Routes, RouterModule } from "@angular/router";

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { FindcourseComponent } from './findcourse/findcourse.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { LogoutComponent } from './logout/logout.component';
import { Login } from "./login/login.service";
import { PlaycourseComponent } from './playcourse/playcourse.component';
import { AuthGuard } from "./auth-guard.service";
import { AuthGuard2 } from "./auth2-guard.service";
import { FindCourseService } from './findcourse/findcourse.service';
import { AuthGuard3 } from './auth3-guard.service';
import { UserprofileComponent } from './userprofile/userprofile.component';

const appRoutes: Routes =
[
  {path: 'home', component: HomeComponent},
  {path: 'findcourse', component: FindcourseComponent},
  {path: 'playcourse', canActivate: [AuthGuard3], component: PlaycourseComponent},
  {path: 'login', canActivate: [AuthGuard2], component: LoginComponent},
  {path: 'register', canActivate: [AuthGuard2], component: RegisterComponent},
  {path: 'feedback', component: FeedbackComponent},
  {path: 'userprofile', canActivate: [AuthGuard], component: UserprofileComponent},
  {path: 'logout', canActivate: [AuthGuard], component: LogoutComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '*', component: HomeComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FindcourseComponent,
    RegisterComponent,
    LoginComponent,
    FeedbackComponent,
    LogoutComponent,
    PlaycourseComponent,
    UserprofileComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AuthGuard, AuthGuard2, AuthGuard3, Login, FindCourseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
