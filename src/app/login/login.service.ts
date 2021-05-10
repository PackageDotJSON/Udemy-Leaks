export class Login
{
  logInSuccess: boolean = false;
  email: string;

  checkAuthentication(check : boolean)
  {
    if(check === true)
    {
      this.logInSuccess = true;
    }
    else
    {
      this.logInSuccess = false;
    }
  }

  isAuthenticated()
  {
    return this.logInSuccess;
  }

  userLoggedInAs(mail)
  {
    this.email = mail;
  }

  isLoggedInAs()
  {
    return this.email;
  }
}
