import { Component, OnInit } from '@angular/core';
import { ApiUrls } from 'src/app/config/ApiUrls';
import { MainserviceService } from 'src/app/service/mainservice.service';

@Component({
  selector: 'app-report-detail',
  templateUrl: './report-detail.component.html',
  styleUrls: ['./report-detail.component.scss']
})

export class ReportDetailComponent implements OnInit {

  itemPerPage = 10;
  currentPage = 1;
  total: any;
  reportList: any = [];
  groupId: any;
  groupStatus: any;
  
  constructor(private service : MainserviceService) { }

  ngOnInit(): void {
    this. report_listApi()
  }

  report_listApi() {
    const data = {
      
    }
    this.service.showSpinner();
    this.service.postApi(ApiUrls.report_list + `?pageNumber=${this.currentPage}&limit=${this.itemPerPage}`,data ,1).subscribe((res)=>{
     this.service.hideSpinner();
     if (res.responseCode==200){
       this.reportList = res.result ?  res.result : [] ;  
       this.total = res.paginationData.total ;
      }
     else{
      this.reportList = res.result ?  res.result : [] ;  
       this.service.errorToast(res.responseMessage)
     }
   },err=>{
     this.service.hideSpinner();
    this.service.errorToast(err.responseMessage)
    })
  }

  pagination(event) {
    // this.userList = [];
    this.currentPage = event;
    this. report_listApi() ;

  }

}
