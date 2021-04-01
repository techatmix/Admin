import { Component, OnInit } from '@angular/core';
import { ApiUrls } from 'src/app/config/ApiUrls';
import { MainserviceService } from 'src/app/service/mainservice.service';

@Component({
  selector: 'app-report-mgt',
  templateUrl: './report-mgt.component.html',
  styleUrls: ['./report-mgt.component.scss']
})
export class ReportMgtComponent implements OnInit {
  userList: any = [];
  itemPerPage = 10;
  currentPage = 1;
  total: any;
  // form:FormGroup;
  userStatus: any;
  userId: any;
  userCsvArr: any = [];
  lastLoginTime: string;
  constructor(private service : MainserviceService) { }

  ngOnInit(): void {
    // this. report_listApi()
    this.userListApi() ;

  }

  userListApi() {
    const data = {
      // search : this.form.value.search
    }
    this.service.showSpinner();
    this.service.postApi(ApiUrls.userList + `?pageNumber=${this.currentPage}&limit=${this.itemPerPage}`,data ,1).subscribe((res)=>{
     this.service.hideSpinner();
     if (res.responseCode==200){
      //  this.userList = res.result ?  res.result : [] ;  
       let  Gmt;
       this.userList = []
       res.result.forEach((ele:any) => {
       Gmt = (new Date(ele.lastLogIn)).toUTCString();
       ele['lastLoginTime'] = Gmt ;
           this.userList.push(ele) ;
       });
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
         "Name" : ele.firstName + '' + ele.lastName,
         "Email" : ele.email,
         "Phone No." : ele.countryCode+ele.mobileNumber,
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
     this. userListApi() ;

  }

}
