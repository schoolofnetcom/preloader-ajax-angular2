import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppHttpService } from '../app/app-http.service';

interface User {
  username?:string;
  password?:string;
}

@Component({
  templateUrl: './login.component.html',
  styles: [require('./login.component.css').toString()],
})

export class LoginComponent {
  public user: User = {};

  constructor (
    private httpService: AppHttpService,
    private router: Router,
  ) {}

  public login () {
    let auth = {
      grant_type: 'password',
      client_id: '2',
      client_secret: 'R8u3pIAN6kDgiNrymKa5rhPiAoaC3g0pX0UZL4Az',
      username: this.user.username,
      password: this.user.password,
      scope: '',
    };

    this.httpService.client('oauth/token').insert(auth)
      .then((res)=>{
        localStorage['tokens'] = JSON.stringify(res);
        this.httpService.setAccessToken(res.access_token);
        this.router.navigate(['/']);
      });
  }
}
