import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiUrls } from 'src/app/config/ApiUrls';
import { MainserviceService } from 'src/app/service/mainservice.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
  profileData: any = {};
  imageType: any;
  file: any;
  imageUrl: any='assets/img/avatars/profile-img.jpg';
  countryArr: any = [];
  permission: any;
  constructor(private router : Router,public mainService : MainserviceService) { }


  ngOnInit(): void {
    this.getProfile() 
  }

  // get profile
  getProfile() {
    this.mainService.showSpinner()
   this.mainService.getApi(ApiUrls.profile, 1).subscribe((res: any) => {
    this.mainService.hideSpinner();
    if (res.responseCode == 200) {
       this.profileData = res.result;
      
       
       this.imageUrl = this.profileData.profilePic
     }
   },err=>{
    this.mainService.hideSpinner();

   })
 }

}
