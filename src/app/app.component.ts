import { Component } from '@angular/core';
import {  Event, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { filter } from 'rxjs';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TradeEngine';

  
  paramRoute: string = '';
 
  constructor() {}

  // Loader
  // Loader
  isLoading!: boolean;

  ngOnInit() {
    this.isLoading = true;

    setTimeout(() => {
      this.isLoading = false;
    }, 600);
  }

  ngAfterViewInit(): void {}

  // getQueryParam(){
  //   this.router.events.pipe(
  //     filter((e: Event): e is RouterEvent => e instanceof NavigationEnd)
  //   ).subscribe((e: RouterEvent) => {
  //     this.paramRoute= e.url;
  //  });
  // }
  
}

$(document).on("wheel", "input[type=number]", function (e) {
  $(this).blur();
});

