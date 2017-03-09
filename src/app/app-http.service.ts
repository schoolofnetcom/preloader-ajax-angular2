import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';

interface Options {
    limit?:number;
    page?:number;
}

interface RequestOptions {
  headers?:any;
}

@Injectable()
export class AppHttpService {
  private url: string;
  private options: RequestOptions = {};

  constructor (private http: Http) {}

  setAccessToken (token: string) {
    //let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjMwOWJmODJhMTQ2ZTBjNzEwMzA0MmQxYmQ0NmFjOTk0Njc1OWIxMjQ1ZjBkNmEyNjZiN2UyMjkyNTVhNThkYjkyOTAwZjRiYzU4MjQ3YzAwIn0.eyJhdWQiOiIyIiwianRpIjoiMzA5YmY4MmExNDZlMGM3MTAzMDQyZDFiZDQ2YWM5OTQ2NzU5YjEyNDVmMGQ2YTI2NmI3ZTIyOTI1NWE1OGRiOTI5MDBmNGJjNTgyNDdjMDAiLCJpYXQiOjE0ODM4MDY3ODIsIm5iZiI6MTQ4MzgwNjc4MiwiZXhwIjoxNTE1MzQyNzgyLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.D2QYSHUYiLWqaJrWTaBFxbLze6xGf7SDBfJcZK74jg0xYyBqYm2hOCBNlGRgl4FGv-LNw0XgI91eR314bXBTQolBv4Xq2Q6vPZikOCNRPhuexMAhOfX_gSXy2Xwp6Thh323sjKNVWEMnM2MQxJgzykEnTD_FMbDkqcR4C4fjbcnwq2q7cscQ42WEn-wLrdGuBfQxekaLqONRNUyfLoPjoRsQxAXgxMFn5dT6fMr-wlUFlKZL7Hp-ozU54PKD3tCt_XdjeCwN5Qcd75BtVciijDyXgloGhtfVH4KiZzmYKKENtTf0-LsdRfCNIU6rt2mv4eiemVDV8_Z80HACny0HLpbyS6xTmYSoS7jyeEBlfHcj14yXSs49m26A2ndhXDNTch16YobUDugiOP0ugzgJngbLFHDISeJkpw1D3bVfapOQJKHE9aQWMs5DWMbwEYA_LsEzDK4cu4mBB7mOgZ2rvtW7ardXshIe3EEefBwhnspat6uZU7_nkYtSQSiFwcO1ra3t4v2-G-IaKqrpkGxy1ofnNcTwIhNeoKsGTtS3Y96qwe9Aw3FVXlDLbsWIboyTQnkqIP2YhnecKcdMlQ0_sI8tVo5TOXYpusRUPqvN3LtVdzQ1C8OPE0Azp1OdIXJ3TpAAUIB1e0TOpxACVt6TDeyZNMT2Hz67m-69y_B1Vpc';
    let header = new Headers({'Authorization': 'Bearer ' + token});
    this.options.headers = header;
  }

  client(url: string) {
    this.url = 'http://localhost:8000/' + url;
    return this;
  }

  builder (resource: string) {
    this.url = 'http://localhost:8000/api/' + resource;
    return this;
  }

  list (options: Options = {}) {
    let url = this.url;

    if (options.limit === undefined) {
      options.limit = 20;
    }

    if (options.page === undefined) {
      options.page = 1;
    }

    url += '?limit=' + options.limit;
    url += '&page=' + options.page;

    return this.http.get(url, this.options)
      .toPromise()
      .then((res) => {
        return res.json() || {};
      });
  }

  view (id: number) {
    return this.http.get(this.url + '/' + id, this.options)
      .toPromise()
      .then((res) => {
        return res.json() || {};
      });
  }

  update (id: number, data: Object) {
    return this.http.put(this.url + '/' + id, data, this.options)
      .toPromise()
      .then((res) => {
        return res.json() || {};
      });
  }

  insert (data: Object) {
    return this.http.post(this.url, data, this.options)
      .toPromise()
      .then((res) => {
        return res.json() || {};
      });
  }

  delete (id: number) {
    return this.http.delete(this.url + '/' + id, this.options)
      .toPromise()
      .then((res) => {
        return res.json() || {};
      });
  }

  search (term: string) {
    return this.http.get(this.url + '/?like=title,' + term, this.options)
      .toPromise()
      .then((res) => {
        return res.json() || {};
      });
  }
}
