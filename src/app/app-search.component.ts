import { Component, Input,  Output, EventEmitter } from '@angular/core';
import { AppHttpService } from './app-http.service';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'search',
  template: `
  <div class="row">
    <div class="input-field col s6">
      <input name="search" type="text" #searchInput id="search-input" class="validate" placeholder="Pesquise aqui..." (keyup)="search(searchInput.value)">
      <label for="search" class="active">Busca</label>
    </div>
  </div>
  `
})

export class AppSearchComponent {
  @Input() resource:string;
  @Output() onSearch = new EventEmitter<boolean>();

  private searchTerm = new Subject<string>();

  constructor(private httpService: AppHttpService) {}

  ngOnInit() {
    this.searchTerm
      .debounceTime(300)
      .distinctUntilChanged()
      .subscribe((term)=>{
        if (term) {
          this.httpService.builder(this.resource)
            .search(term)
            .then((res) => {
              this.onSearch.emit(res);
            })
        }
        this.httpService.builder(this.resource)
          .list()
          .then((res) => {
            this.onSearch.emit(res);
          })
      })
  }

  search(term: string) {
    this.searchTerm.next(term);
  }

}
