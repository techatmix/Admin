import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiUrls } from 'src/app/config/ApiUrls';
import { MainserviceService } from 'src/app/service/mainservice.service';
import { ngxCsv } from 'ngx-csv/ngx-csv';
declare var $ :any;
@Component({
  selector: 'app-role-mgt',
  templateUrl: './role-mgt.component.html',
  styleUrls: ['./role-mgt.component.scss']
})
export class RoleMgtComponent implements OnInit {
  userList: any = [];
  itemPerPage = 10;
  currentPage = 1;
  total: any;
  form:FormGroup;
  subadminStatus: any;
  userId: any;
  userCsvArr: any = [];
  

  constructor(public service: MainserviceService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      search : new FormControl('', Validators.required)
    })
  this.userListApi() ;
  this.form.valueChanges.subscribe((res)=>{
    if ( this.form.value.search == ''){
      this.userListApi() ;
    }
  })

  }

  // ExportCsv(){
  //   var options = { 
  //    showLabels: true, 
  //    headers: ["Sr. No.", "Name","Email", "Phone No.","Added on"]
  //  };
  //  new ngxCsv(this.userCsvArr, 'Manage User Report' ,options);    
  // }


  userListApi() {
    const data = {
      search : this.form.value.search
    }
    this.service.showSpinner();
    this.service.postApi(ApiUrls.subadminList + `?pageNumber=${this.currentPage}&limit=${this.itemPerPage}`,data ,1).subscribe((res)=>{
     this.service.hideSpinner();
     if (res.responseCode==200){
       this.userList = res.result ?  res.result : [] ;  
       this.total = res.paginationData.total ;
       this.userList.forEach((ele,index) => {
        let   date = new Date(ele.createdAt);
        let year = date.getFullYear();
        let month:any = date.getMonth()+1;
        let dt:any = date.getDate();
  
         if (dt < 10) {
           dt = '0' + dt;
         }
         if (month < 10) {
           month = '0' + month;
         }
         let finalDate = dt+'/'+month+'/'+year;
        this.userCsvArr.push({
         "Sr. No." : index+1,
         "Name" : "Abhishek",
         "Email" : ele.email,
         "Phone No." : '+918888888888',
         "Added on" : finalDate,
       })
      });
      }
     else{
      this.userList = res.result ?  res.result : [] ;  
     }
   },err=>{
     this.service.hideSpinner();
    this.service.errorToast(err.responseMessage)
    })
  }

  pagination(event) {
    // this.userList = [];
    this.currentPage = event;
    this.userListApi() ;

  }


  openDeleteModal(userId){
    this.userId = userId
    $('#deleteUser').modal('show')
 }

 openActiveBlock(status , id){
  this.subadminStatus = status;
  this.userId = id;
  $('#actBlockStatus').modal('show')
}

 updateActiveBlock(){
  this.subadminStatus == 'ACTIVE'? this.subadminStatus = 'BLOCK' : this.subadminStatus = 'ACTIVE';
  const data = {
    userId : this.userId,
    status : this.subadminStatus
  }
  this.service.putApi(ApiUrls.actionPerformSubadmin , data ,1).subscribe((res)=>{
    if (res.responseCode == 200){
      $('#actBlockStatus').modal('hide')
      this.service.successToast(res.responseMessage)
      this.userListApi() ;
    }
    else{
      this.service.errorToast(res.responseMessage)
    }
  })

}

deleteUser(){
  const data = {
    userId : this.userId,
    status : "DELETE"
  }
  this.service.putApi(ApiUrls.actionPerformSubadmin , data ,1).subscribe((res)=>{
    if (res.responseCode == 200){
      $('#deleteUser').modal('hide')
      this.service.successToast(res.responseMessage)
      this.userListApi() ;
    }
    else{
      this.service.errorToast(res.responseMessage)
    }
  })

}

}
