import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiUrls } from 'src/app/config/ApiUrls';
import { MainserviceService } from 'src/app/service/mainservice.service';

@Component({
  selector: 'app-add-college',
  templateUrl: './add-college.component.html',
  styleUrls: ['./add-college.component.scss']
})
export class AddCollegeComponent implements OnInit {
  groupList: any = [];
  programList: any = [];
  form: FormGroup;

  constructor(public service : MainserviceService , private router : Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      university : new FormControl('', Validators.required),
      college : new FormControl('', Validators.required),
    })
    this.userListApi();
  }

  userListApi() {
    const data = {
      
    }
    this.service.showSpinner();
    this.service.postApi(ApiUrls.group_list,data ,1).subscribe((res)=>{
     this.service.hideSpinner();
     if (res.responseCode==200){
       this.groupList = res.result ?  res.result : [] ;  
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


  addCollege(){
    if (this.form.valid){
      const data = {
        groupId : this.form.value.university,
        collegeName :  this.form.value.college
  
      }
      this.service.showSpinner();
      this.service.postApi(ApiUrls.add_college ,data ,1).subscribe((res)=>{
       this.service.hideSpinner();
       if (res.responseCode==200){
        this.service.successToast('College added successfully')
          this.router.navigate(['/group-mgt/manage-college'])
        }
       else{
         this.service.errorToast(res.responseMessage)
       }
     },err=>{
       this.service.hideSpinner();
      this.service.errorToast(err.responseMessage)
      })
    }else{
      this.service.errorToast('All fields are required')
    }
    
  }

}
