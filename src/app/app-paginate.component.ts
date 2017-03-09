import { Component, Input,  Output, EventEmitter } from '@angular/core';
import { AppHttpService } from './app-http.service';

@Component({
  selector: 'paginate',
  template: `
  <div class="center-align">
    <ul class="pagination">
      <li class="waves-effect" [ngClass]="{'active': page == activePage}" *ngFor="let page of pages">
        <a (click)="changePage(page)">{{page}}</a>
      </li>
    </ul>
    <p>Você tem um total de {{total}} registros, exibindo página {{activePage}} de {{totalPage}}</p>
  </div>
  `
})

export class AppPaginateComponent {
  @Input() total:number;
  @Input() activePage:number;
  @Input() totalPage:number;
  @Input() pages:Array<number>;
  @Input() resource:string;
  @Output() onChangePage = new EventEmitter<boolean>();

  constructor(private httpService: AppHttpService) {}

  ngOnChanges(changes: any) {
    if (changes.totalPage) {
      this.pages = Array(this.totalPage)
        .fill(this.totalPage)
        .map((x, i) => {
          return i+1;
        })
    }
  }

  changePage(page: number) {
    this.activePage = page;
    this.httpService.builder(this.resource).list({page: page})
      .then((res) => {
        this.onChangePage.emit(res)
      })
  }

}
