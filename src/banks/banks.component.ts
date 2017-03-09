import { Component } from '@angular/core';
import { AppHttpService } from '../app/app-http.service';

@Component({
  templateUrl: './banks.component.html',
})
export class BanksComponent {
  public banks: Object = {
    data: []
  };

  constructor (private httpService: AppHttpService) {}

  ngOnInit () {
    this.list();
  }

  list () {
    this.httpService.builder('banks')
      .list()
      .then((res) => {
        this.banks = res;
      })
  }

  pageChanged(data: Object) {
    this.banks = data;
  }

  searched(data: Object) {
    this.banks = data;
  }
}
