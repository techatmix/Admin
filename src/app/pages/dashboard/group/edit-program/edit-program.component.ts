import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiUrls } from 'src/app/config/ApiUrls';
import { MainserviceService } from 'src/app/service/mainservice.service';

@Component({
  selector: 'app-edit-program',
  templateUrl: './edit-program.component.html',
  styleUrls: ['./edit-program.component.scss']
})
export class EditProgramComponent implements OnInit {
  groupList: any;
  form : FormGroup;
  programId: any;
  viewProgram: any;
  constructor(public service : MainserviceService , private router : Router, private activatedroute : ActivatedRoute) { 
    this.activatedroute.params.subscribe((res)=>{
      this.programId  = res.id
    })
  }

  ngOnInit(): void {
    this.form  = new FormGroup({
      programName : new FormControl('',Validators.required)
    })
    this.viewProgramApi()
  }


  viewProgramApi(){
    this.service.showSpinner();
    this.service.getApi(ApiUrls.view_program + `?programId=${this.programId}` , 1).subscribe((res)=>{
      this.service.hideSpinner();
      if (res.responseCode==200){
        this.viewProgram = res.result;
        this.form.patchValue({
          programName : this.viewProgram.programName,
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

  editProgram(){
    if (this.form.valid){
      const data ={
        programId :   this.programId ,
        programName : this.form.value.programName
         }

      this.service.showSpinner();
      this.service.postApi(ApiUrls.update_program , data , 1).subscribe((res)=>{
        this.service.hideSpinner();
        if (res.responseCode==200){
          this.router.navigate(['/group-mgt/manage-program'])
          this.service.successToast('Program updated successfully')
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
