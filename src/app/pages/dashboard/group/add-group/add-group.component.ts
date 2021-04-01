import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiUrls } from 'src/app/config/ApiUrls';
import { MainserviceService } from 'src/app/service/mainservice.service';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.scss']
})
export class AddGroupComponent implements OnInit {
  form: FormGroup;

  constructor(public service : MainserviceService , private router : Router) { }

  ngOnInit(): void {
    this.form =  new FormGroup({
      groupName : new FormControl('', Validators.required)
    })
  }

  addGroup() {
    const data = {
      groupName : this.form.value.groupName
    }
    this.service.showSpinner();
    this.service.postApi(ApiUrls.add_group ,data ,1).subscribe((res)=>{
     this.service.hideSpinner();
     if (res.responseCode==200){
      this.service.successToast('University added successfully')
        this.router.navigate(['/group-mgt'])
      }
     else{
       this.service.errorToast(res.responseMessage)
     }
   },err=>{
     this.service.hideSpinner();
    this.service.errorToast(err.responseMessage)
    })
  }


}
