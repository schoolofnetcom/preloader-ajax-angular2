import { Component } from '@angular/core';
import { PreloaderService } from './preloader.service';

@Component({
  selector: 'preloader',
  styles: [
  `
  .preloader-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.8);
    z-index: 9999;
  }
  .preloader {
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -160px 0 0 -160px;
  }
  `
  ],
  templateUrl: './preloader.html'
})
export class PreloaderComponent {
  constructor(public preloaderService: PreloaderService) {}
}
