import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,  Event, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-hearder',
  templateUrl: './hearder.component.html',
  styleUrls: ['./hearder.component.css']
})
export class HearderComponent implements OnInit {

  paramRoute: string = '';
  name = null;
  constructor(
    private route : ActivatedRoute,
    private router: Router,
  ) { 
    this.getQueryParam();
  }

  ngOnInit(): void {
   
  }

  getQueryParam(){
    this.router.events.pipe(
      filter((e: Event): e is RouterEvent => e instanceof NavigationEnd)
    ).subscribe((e: RouterEvent) => {
      this.paramRoute= e.url;
   });
  }

  getUserName(){
   localStorage.getItem('user_name');
  }

  register(){
    this.router.navigateByUrl('/authentication/sign-up')
  }

  login(){
    this.router.navigateByUrl('/authentication/sign-in')
  }

}
