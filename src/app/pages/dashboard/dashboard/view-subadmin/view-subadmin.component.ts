import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiUrls } from 'src/app/config/ApiUrls';
import { MainserviceService } from 'src/app/service/mainservice.service';

@Component({
  selector: 'app-view-subadmin',
  templateUrl: './view-subadmin.component.html',
  styleUrls: ['./view-subadmin.component.scss']
})
export class ViewSubadminComponent implements OnInit {
  myPermission : any =[]
  viewSubadmin: any;
  userId: any;
  imageUrl: any = 'assets/img/avatars/profile-img.jpg';
  constructor(private service : MainserviceService , private router : Router , private activatedroute : ActivatedRoute) { 
    this.activatedroute.params.subscribe((res)=>{
      this.userId = res.id
    })
  }

  ngOnInit(): void {
    this.viewSubadminApi() 
  }


  viewSubadminApi() {
  
    this.service.showSpinner();
    this.service.getApi(ApiUrls.viewSubadmin + `?userId=${this.userId}` ,1).subscribe((res)=>{
     this.service.hideSpinner();
     if (res.responseCode==200){
       this.viewSubadmin = res.result ?  res.result : [] ;  
       var result = Object.entries(this.viewSubadmin.permissions[0]);       
       for (var i = 0; i < result.length; i++) {
         for (var z = 0; z < result[i].length; z++) {
           if (result[i][z] == true) {
             var v = result[i][0];
             var len = v.length;
             var len = v.length;
             if (v == "dashboard") {
               var finalper = v
             }else if (v == "problemReport"){
              finalper = v.replace('problemReport','Problem Report')
             }
             else {
               finalper = 'Manage' + ' ' + v.slice(0, len - 10) 
             }
             this.myPermission.push(finalper);
           }
         }
       }
       this.imageUrl = this.viewSubadmin.profilePic
      }
     else{
      this.viewSubadmin = res.result ?  res.result : [] ;  
       this.service.errorToast(res.responseMessage)
     }
   },err=>{
     this.service.hideSpinner();
    this.service.errorToast(err.responseMessage)
    })
  }


}
