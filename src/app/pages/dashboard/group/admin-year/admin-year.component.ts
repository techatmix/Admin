import { Component, OnInit } from '@angular/core';
import { ngxCsv } from 'ngx-csv';
import { ApiUrls } from 'src/app/config/ApiUrls';
import { MainserviceService } from 'src/app/service/mainservice.service';
declare var $ : any;
@Component({
  selector: 'app-admin-year',
  templateUrl: './admin-year.component.html',
  styleUrls: ['./admin-year.component.scss']
})
export class AdminYearComponent implements OnInit {
  itemPerPage = 10;
  currentPage = 1;
  total: any;
  yearList: any = [];
  _id: any;
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
    this.service.postApi(ApiUrls.year_list + `?pageNumber=${this.currentPage}&limit=${this.itemPerPage}`,data ,1).subscribe((res)=>{
     this.service.hideSpinner();
     if (res.responseCode==200){
       this.yearList = res.result ?  res.result : [] ;  
       this.total = res.paginationData ?  res.paginationData.total : '';
       this.yearList.forEach((ele,index) => {
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
        
         "Year" : ele.year ,
         "Added on" : finalDate,
       })
      });
      }
     else{
      this.yearList = res.result ?  res.result : [] ;  
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
     headers: ["Sr. No.", "Year","Added on"]
   };
   new ngxCsv(this.userCsvArr, 'Manage Year Report' ,options);    
  }

  pagination(event) {
    // this.userList = [];
    this.currentPage = event;
    this.userListApi() ;

  }


  openDeleteModal(id){
    this._id = id ;
    $('#deleteUser').modal('show')
 }

 deleteUser(){
  const data = {
    _id : this._id,
    status : "DELETE"
  }
  this.service.postApi(ApiUrls.actionPerform_year , data ,1).subscribe((res)=>{
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
  this._id = id;
  $('#actBlockStatus').modal('show')
}

updateActiveBlock(){
  this.groupStatus == 'ACTIVE'? this.groupStatus = 'BLOCK' : this.groupStatus = 'ACTIVE';
  const data = {
    _id : this._id,
    status : this.groupStatus
  }
  this.service.postApi(ApiUrls.actionPerform_year , data ,1).subscribe((res)=>{
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
