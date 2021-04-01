import { Component, OnInit } from '@angular/core';
import { ngxCsv } from 'ngx-csv';
import { ApiUrls } from 'src/app/config/ApiUrls';
import { MainserviceService } from 'src/app/service/mainservice.service';
declare var $ : any;
@Component({
  selector: 'app-manage-program',
  templateUrl: './manage-program.component.html',
  styleUrls: ['./manage-program.component.scss']
})
export class ManageProgramComponent implements OnInit {
  itemPerPage = 10;
  currentPage = 1;
  total: any;
  programList: any = [];
  programId: any;
  programStatus: any;
  userCsvArr: any =[];
  constructor(private service : MainserviceService) { }

  ngOnInit(): void {
    this.userListApi()
  }

  userListApi() {
    const data = {
      
    }
    this.service.showSpinner();
    this.service.postApi(ApiUrls.program_list + `?pageNumber=${this.currentPage}&limit=${this.itemPerPage}`,data ,1).subscribe((res)=>{
     this.service.hideSpinner();
     if (res.responseCode==200){
       this.programList = res.result ?  res.result : [] ;  
       this.total = res.paginationData.total ;
       this.programList.forEach((ele,index) => {
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
         "University Name" : ele.groupId.groupName,
         "Program Name" :ele.programName,
         "Added on" : finalDate,
       })
      });
      }
     else{
      this.programList = res.result ?  res.result : [] ;  
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
     headers: ["Sr. No.", "University Name","Program Name","Added on"]
   };
   new ngxCsv(this.userCsvArr, 'Manage Program Report' ,options);    
  }

  pagination(event) {
    // this.userList = [];
    this.currentPage = event;
    this.userListApi() ;

  }


  openDeleteModal(id){
    this.programId = id ;
    $('#deleteUser').modal('show')
 }

 deleteUser(){
  const data = {
    programId : this.programId,
    status : "DELETE"
  }
  this.service.postApi(ApiUrls.actionPerform_program , data ,1).subscribe((res)=>{
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
  this.programStatus = status;
  this.programId = id;
  $('#actBlockStatus').modal('show')
}

updateActiveBlock(){
  this.programStatus == 'ACTIVE'? this.programStatus = 'BLOCK' : this.programStatus = 'ACTIVE';
  const data = {
    programId : this.programId,
    status : this.programStatus
  }
  this.service.postApi(ApiUrls.actionPerform_program , data ,1).subscribe((res)=>{
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
