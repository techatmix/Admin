import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiUrls } from 'src/app/config/ApiUrls';
import { MainserviceService } from 'src/app/service/mainservice.service';

@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.scss']
})
export class EditGroupComponent implements OnInit {
  form: FormGroup;
  groupId: any;
  groupdata: any;

  constructor(public service : MainserviceService , private router : Router , private activatedroute : ActivatedRoute) { 
    this.activatedroute.params.subscribe((res)=>{
      this.groupId = res.id
    })
  }

  ngOnInit(): void {
    this.form =  new FormGroup({
      groupName : new FormControl('', Validators.required)
    });
    this.getGroup()
  }

  getGroup(){
    this.service.getApi(ApiUrls.view_group +`?groupId=${this.groupId}`  ,1).subscribe((res)=>{
      this.service.hideSpinner();
      if (res.responseCode==200){
        this.groupdata= res.result;
        this.form.patchValue({
          groupName : this.groupdata.groupName
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

  editGroup() {
    const data = {
      groupName : this.form.value.groupName,
      groupId  :  this.groupId
    }
    this.service.showSpinner();
    this.service.postApi(ApiUrls.update_group ,data ,1).subscribe((res)=>{
     this.service.hideSpinner();
     if (res.responseCode==200){
      this.service.successToast('University updated successfully')
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
