import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiUrls } from 'src/app/config/ApiUrls';
import { MainserviceService } from 'src/app/service/mainservice.service';
import { ngxCsv } from 'ngx-csv/ngx-csv';

declare var $ : any ;

@Component({
  selector: 'app-user-mgt',
  templateUrl: './user-mgt.component.html',
  styleUrls: ['./user-mgt.component.scss']
})
export class UserMgtComponent implements OnInit {
  userList: any = [];
  itemPerPage = 10;
  currentPage = 1;
  total: any;
  form:FormGroup;
  userStatus: any;
  userId: any;
  userCsvArr: any = [];
  lastLoginTime: string;

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

  ExportUserCsv(){
    var options = { 
     showLabels: true, 
     headers: [ "Name"  ,"Email", "Phone No.","Home Country",
      "Meeting Preference" , "Last Login Time" , "University Name" , "Program Name" , "College Name" , "Accomodation Name" ,
    "Enrollment Year" , "Region" , "Universities Connection" , "Weekly Availability" , "Start Time" , "End Time"]
   };
   new ngxCsv(this.userCsvArr, 'View User Report' ,options);    
  }
  ExportCsv(){
    var options = { 
     showLabels: true, 
     headers: ["Sr. No.", "Name","Email", "Phone No.","Added on"]
   };
   new ngxCsv(this.userCsvArr, 'Manage User Report' ,options);    
  }


  userListApi() {
    const data = {
      search : this.form.value.search
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

  downloadReport(id){
  
      this.service.showSpinner();
      this.service.getApi(ApiUrls.viewUser + `?userId=${id}` ,1).subscribe((res)=>{
       this.service.hideSpinner();
       if (res.responseCode==200){
         let userList = res.result ?  res.result : [] ;  
         this.lastLoginTime = (new Date(res.result.lastLogIn)).toUTCString();
         console.log('  this.lastLoginTime ',  this.lastLoginTime );
         this.userCsvArr = [];
          let   date =(new Date(userList.lastLogIn)).toUTCString();
          // let year = date.getFullYear();
          // let month:any = date.getMonth()+1;
          // let dt:any = date.getDate();
    
          //  if (dt < 10) {
          //    dt = '0' + dt;
          //  }
          //  if (month < 10) {
          //    month = '0' + month;
          //  }
          //  let finalDate = dt+'/'+month+'/'+year;
          let uniName:any[] = [];
          let availability : any [] = []
           userList.universityConnections.map(x => {
          uniName.push(x.groupName)
          });
          userList.availability.map(x => {
            availability.push(x.day , x.slot_startTime , x.slot_endTime)
            });
          console.log('uniName', uniName );
          
          this.userCsvArr.push({
           "Name" : userList.firstName + ' ' + userList.lastName,
           "Email" : userList.email,
           "Phone No." : userList.countryCode+userList.mobileNumber,
           "Home Country" : userList.home_country,
           "Meeting Preference" : userList.meeting_preference,
           "Last Login Time" :  date, 
           "University Name" : userList.universityId.groupName,
            "Program Name" : userList.programId.programName,
            "College Name" : userList.collegeId.collegeName,
            "Accomodation Name" : userList.accomodationId.accomodationName,
            "Enrollment Year" : userList.enrollment_yearId.year,
            "Region" : userList.region , 
             "Universities Connection" : uniName,
             "Weekly Availability" :  availability
         })
        this.ExportUserCsv();
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
  this.userStatus = status;
  this.userId = id;
  $('#actBlockStatus').modal('show')
}

updateActiveBlock(){
  this.userStatus == 'ACTIVE'? this.userStatus = 'BLOCK' : this.userStatus = 'ACTIVE';
  const data = {
    userId : this.userId,
    status : this.userStatus
  }
  this.service.putApi(ApiUrls.actionPerform , data ,1).subscribe((res)=>{
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
  this.service.putApi(ApiUrls.actionPerform , data ,1).subscribe((res)=>{
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
