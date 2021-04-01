import { Component, OnInit , AfterViewInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import firebase from 'firebase/app';

@Component({
  selector: 'body',
  template: '<ngx-spinner bdColor="rgba(51,51,51,0.8)" size="medium" color="#20a8d8" type="ball-scale-multiple"></ngx-spinner> <app-sidebar-new></app-sidebar-new> <router-outlet></router-outlet>',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit , AfterViewInit{
  title = 'mixaar-admin';
  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }

  ngAfterViewInit() {
    //logEvent : notification_received screen_view page_view
   const firbaseData = firebase.analytics().logEvent('eventname',{
      'firsttimeuser' : true,
      'username' : "Abhishek Admin",
       'login' : true,
       'page_view' : true,
       'screen_view' : true,
       'sign_up':true
    })
    console.log('firbaseData',firbaseData);
    
  }

}
