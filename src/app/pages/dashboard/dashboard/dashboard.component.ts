import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ApiUrls } from 'src/app/config/ApiUrls';
import { MainserviceService } from 'src/app/service/mainservice.service';
import { navItems } from 'src/app/sidebar.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit , AfterViewInit{
  public sidebarMinimized = false;
   public navItems = navItems;
  imageUrl: any = 'assets/img/avatars/profile-img.jpg';
  permission: any;
  userType: string;


  constructor(private mainService : MainserviceService) {
   }

  ngOnInit(): void {
    this.mainService.profileData.subscribe((res)=>{
       this.imageUrl = res
    });
    this.getProfile();
  }

  // get profile
  getProfile() {
    this.mainService.showSpinner()
   this.mainService.getApi(ApiUrls.profile, 1).subscribe((res: any) => {
    localStorage.setItem('responseCode',res.responseCode);
    this.mainService.isToken.next(res.responseCode)
    this.mainService.hideSpinner();
    if (res.responseCode == 200) {
       this.imageUrl = res.result.profilePic;
       this.permission = res.result.permissions[0];
       this.mainService.permission.next( this.permission )
     }
   },err=>{
    this.mainService.hideSpinner();

   })
 }


  


  ngAfterViewInit(){
   let tag = document.getElementsByTagName('app-sidebar-nav');
   let children ;
   children = tag[0].children[0].children
   this.userType =  localStorage.getItem('userType') ? window.atob( localStorage.getItem('userType')) :"";   
   if (this.userType == 'SUBADMIN'){
    children[8].setAttribute("hidden", true); 
   }
   
   setTimeout(() => {
    if (this.permission){
      if (this.permission.dashboard == false){
        children[0].setAttribute("hidden", true); 
       }
       if (this.permission.userManagement == false){
        children[2].setAttribute("hidden", true); 
       }
       if (this.permission.groupManagement == false){
        children[3].setAttribute("hidden", true); 
       }
       if (this.permission.broadcastManagement == false){
        children[4].setAttribute("hidden", true); 
       }
       if (this.permission.reportManagement == false){
        children[6].setAttribute("hidden", true); 
       }
       if (this.permission.problemReport == false){
        children[7].setAttribute("hidden", true); 
       }
      console.log('permission',this.permission);
    }
  
   }, 2000);
   
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

}


