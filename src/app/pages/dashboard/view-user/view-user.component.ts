import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiUrls } from 'src/app/config/ApiUrls';
import { MainserviceService } from 'src/app/service/mainservice.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent implements OnInit {
  userList: any;
  userId: any;
  lastLoginTime: string;

  constructor(private service : MainserviceService , private activatedroute : ActivatedRoute) { 
    this.activatedroute.params.subscribe((res)=>{
      this.userId  = res.id
    })
  }

  ngOnInit(): void {
    this.userListApi();
  }
  userListApi() {
  
    this.service.showSpinner();
    this.service.getApi(ApiUrls.viewUser + `?userId=${this.userId}` ,1).subscribe((res)=>{
     this.service.hideSpinner();
     if (res.responseCode==200){
       this.userList = res.result ?  res.result : [] ;  
       this.lastLoginTime = (new Date(res.result.lastLogIn)).toUTCString();
       console.log('  this.lastLoginTime ',  this.lastLoginTime );
       
      }
     else{
      this.userList = res.result ?  res.result : [] ;  
       this.service.errorToast(res.responseMessage)
     }
   },err=>{
     this.service.hideSpinner();
    this.service.errorToast(err.responseMessage)
    })
  }

}
