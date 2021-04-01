import { Component, OnInit } from '@angular/core';
import { ngxCsv } from 'ngx-csv';
import { ApiUrls } from 'src/app/config/ApiUrls';
import { MainserviceService } from 'src/app/service/mainservice.service';
declare var $ : any;
@Component({
  selector: 'app-manage-accomodation',
  templateUrl: './manage-accomodation.component.html',
  styleUrls: ['./manage-accomodation.component.scss']
})
export class ManageAccomodationComponent implements OnInit {
  itemPerPage = 10;
  currentPage = 1;
  total: any;
  groupList: any = [];
  accomodationId: any;
  groupStatus: any;
  userCsvArr: any = [];
  constructor(private service : MainserviceService) { }

  ngOnInit(): void {
    this.userListApi()
  }

  userListApi() {
    const data = {
      
    }
    this.service.showSpinner();
    this.service.postApi(ApiUrls.accomodation_list + `?pageNumber=${this.currentPage}&limit=${this.itemPerPage}`,data ,1).subscribe((res)=>{
     this.service.hideSpinner();
     if (res.responseCode==200){
       this.groupList = res.result ?  res.result : [] ;  
       this.total = res.paginationData.total ;
       this.groupList.forEach((ele,index) => {
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
        
         "Name" : ele.accomodationName ,
         "Added on" : finalDate,
       })
      });
      }
     else{
      this.groupList = res.result ?  res.result : [] ;  
       this.service.errorToast(res.responseMessage)
     }
   },err=>{
     this.service.hideSpinner();
    this.service.errorToast(err.responseMessage)
    })
  }

  ExportCsv(){
    var options = { 
     showLabels: true, 
     headers: ["Sr. No.", "Name","Added on"]
   };
   new ngxCsv(this.userCsvArr, 'Manage Accomodation Report' ,options);    
  }

  pagination(event) {
    // this.userList = [];
    this.currentPage = event;
    this.userListApi() ;

  }


  openDeleteModal(id){
    this.accomodationId = id ;
    $('#deleteUser').modal('show')
 }

 deleteUser(){
  const data = {
    accomodationId : this.accomodationId,
    status : "DELETE"
  }
  this.service.postApi(ApiUrls.actionPerform_accomodation , data ,1).subscribe((res)=>{
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

openActiveBlock(status , id){
  this.groupStatus = status;
  this.accomodationId = id;
  $('#actBlockStatus').modal('show')
}

updateActiveBlock(){
  this.groupStatus == 'ACTIVE'? this.groupStatus = 'BLOCK' : this.groupStatus = 'ACTIVE';
  const data = {
    accomodationId : this.accomodationId,
    status : this.groupStatus
  }
  this.service.postApi(ApiUrls.actionPerform_accomodation , data ,1).subscribe((res)=>{
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

}
