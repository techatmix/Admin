import { INavData } from '@coreui/angular';
import { Component, OnInit } from '@angular/core';
import { MainserviceService } from './service/mainservice.service';

export var navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
 
  },
  {
    title: true,
    name: 'App Management',
    
  },
  {
    name: 'Manage User',
    url: '/user-mgt',
    icon: 'icon-user',
   
  },
  {
    name: 'Manage Group',
    url: '/group-mgt',
    icon: 'icon-people',
     children : [
      {
        name: 'Manage University',
        url: '/group-mgt',
        icon: 'icon-book-open',
       },
       {
        name: 'Manage Program',
        url: '/group-mgt/manage-program',
        icon: 'icon-book-open',
       },
       {
        name: 'Manage College',
        url: '/group-mgt/manage-college',
        icon: 'icon-book-open',
       },
       {
        name: 'Manage Accomodation',
        url: '/group-mgt/manage-accomodation',
        icon: 'icon-book-open',
       },
       {
        name: 'Manage Years',
        url: '/group-mgt/admin-year',
        icon: 'icon-book-open',
       }
     ]
  },
  {
    name: 'Broadcast',
    url : "/broadcast-mgt",
    icon: 'icon-bell',
  
  },
  {
    title: true,
    name: 'Reporting',
    
  },
  
  {
    name: 'User Information',
    url: '/report-mgt',
    icon: 'icon-info',
    
  },
  {
    name: 'Problem Reports',
    url: '/report-detail',
    icon: 'icon-info',
    
  },
  
  {
    name: 'Role Management',
    url: '/role-mgt',
    icon: 'icon-user',
  
  },

  {
    name: 'Setting',
    url: '/my-profile',
    icon: 'icon-settings',
  
  },

  {
    name: 'Logout',
    url: '/login',
    icon: 'icon-logout',
  
  }
 
  
];

@Component({
  selector: 'app-sidebar-new',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class sidebarComponent implements OnInit {
  constructor() {}
  ngOnInit(){}
}


