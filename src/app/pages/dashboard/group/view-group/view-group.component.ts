import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiUrls } from 'src/app/config/ApiUrls';
import { MainserviceService } from 'src/app/service/mainservice.service';

@Component({
  selector: 'app-view-group',
  templateUrl: './view-group.component.html',
  styleUrls: ['./view-group.component.scss']
})
export class ViewGroupComponent implements OnInit {
  groupList: any;
  form : FormGroup;
  constructor(public service : MainserviceService , private router : Router) { }

  ngOnInit(): void {
    this.form  = new FormGroup({
      programName : new FormControl('',Validators.required)
    })
  }

 
  addProgram(){
    if (this.form.valid){
      const data ={
        programName : this.form.value.programName
         }

      this.service.showSpinner();
      this.service.postApi(ApiUrls.add_program , data , 1).subscribe((res)=>{
        this.service.hideSpinner();
        if (res.responseCode==200){
          this.router.navigate(['/group-mgt/manage-program'])
          this.service.successToast('Program added successfully')
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
