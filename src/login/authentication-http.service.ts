import {Injectable } from '@angular/core';
import { Request, Response, XHRBackend, RequestOptions, RequestOptionsArgs, Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Router } from '@angular/router';
import { PreloaderService } from '../preloader/preloader.service';

@Injectable()
export class AuthenticationHttpService extends Http {
  constructor (
    backend: XHRBackend,
    defaultOptions: RequestOptions,
    private router: Router,
    public preloaderService: PreloaderService
  ) {
    super(backend, defaultOptions);

    let token = localStorage['tokens'] ? JSON.parse(localStorage['tokens']) : {};
    if (token.access_token) {
      this.setAccessToken(token.access_token);
    }
  }

  request(url: string | Request, options:RequestOptionsArgs) : Observable<Response> {
    this.preloaderService.showPreloader();
    return super.request(url, options).catch((error: Response) => {
      if (error.status === 401 || error.status === 0) {
        this.refreshToken()
          .then((response) => {
            if (response) {
              let token = localStorage['tokens'] ? JSON.parse(localStorage['tokens']) : {};
              if (token.access_token) {
                this.setAccessToken(token.access_token);
                alert('Login atualizado, refaça o último passo');
              }
            } else {
              this.router.navigate(['/login']);
            }
          });
      }
      return Observable.throw(error);
    }).finally(() => {
      var timer = Observable.timer(1000);
      timer.subscribe(t => {
        this.preloaderService.hidePreloader();
      });
    });
  }

  protected setAccessToken(token: string) {
    let header = new Headers({'Authorization': 'Bearer ' + token});
    this._defaultOptions.headers = header;
  }

  protected refreshToken() {
    let token = localStorage['tokens'] ? JSON.parse(localStorage['tokens']) : {};
    if (token.refresh_token) {
      let auth = {
        grant_type: 'refresh_token',
        client_id: '2',
        client_secret: 'R8u3pIAN6kDgiNrymKa5rhPiAoaC3g0pX0UZL4Az',
        refresh_token: token.refresh_token,
        scope: '',
      }

      return this.post('http://localhost:8000/oauth/token', auth)
        .toPromise()
        .then((res) => {
          let result = res.json() || {};
          localStorage['tokens'] = JSON.stringify(result);
          return result.refresh_token !== undefined;
        });
    }
    return new Promise((resolve, reject) => {
      return resolve(false);
    });
  }
}
