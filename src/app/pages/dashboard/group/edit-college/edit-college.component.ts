import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiUrls } from 'src/app/config/ApiUrls';
import { MainserviceService } from 'src/app/service/mainservice.service';

@Component({
  selector: 'app-edit-college',
  templateUrl: './edit-college.component.html',
  styleUrls: ['./edit-college.component.scss']
})
export class EditCollegeComponent implements OnInit {
  groupList: any;
  form : FormGroup;
  collegeId: any;
  CollegeData: any;
  constructor(public service : MainserviceService , private router : Router, private activatedroute : ActivatedRoute) { 
    this.activatedroute.params.subscribe((res)=>{
      this.collegeId  = res.id
    })
  }

  ngOnInit(): void {
    this.form  = new FormGroup({
      college : new FormControl('',Validators.required)
    })
    this.CollegeDataApi()
  }


  CollegeDataApi(){
    this.service.showSpinner();
    this.service.getApi(ApiUrls.view_college + `?collegeId=${this.collegeId}` , 1).subscribe((res)=>{
      this.service.hideSpinner();
      if (res.responseCode==200){
        this.CollegeData = res.result;
        this.form.patchValue({
          college : this.CollegeData.collegeName,
        })
       }
      else{
        this.service.errorToast(res.responseMessage)
      }
    },err=>{
      this.service.hideSpinner();
     this.service.errorToast(err.responseMessage)
     })
  }

  editCollege(){
    if (this.form.valid){
      const data ={
        collegeId :   this.collegeId ,
        collegeName : this.form.value.college
         }

      this.service.showSpinner();
      this.service.postApi(ApiUrls.update_college , data , 1).subscribe((res)=>{
        this.service.hideSpinner();
        if (res.responseCode==200){
          this.router.navigate(['/group-mgt/manage-college'])
          this.service.successToast('College updated successfully')
         }
        else{
          this.service.errorToast(res.responseMessage)
        }
      },err=>{
        this.service.hideSpinner();
       this.service.errorToast(err.responseMessage)
       })
    }else{
      this.service.errorToast('All Fields are required')
    }
  }

}
