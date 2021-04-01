import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiUrls } from 'src/app/config/ApiUrls';
import { MainserviceService } from 'src/app/service/mainservice.service';

@Component({
  selector: 'app-edit-accomodation',
  templateUrl: './edit-accomodation.component.html',
  styleUrls: ['./edit-accomodation.component.scss']
})
export class EditAccomodationComponent implements OnInit {
  form: FormGroup;
  accomodationId: any;
  viewAccomodationData: any;

  constructor(public service : MainserviceService , private router : Router , private activatedroute : ActivatedRoute ) {
    this.activatedroute.params.subscribe((res)=>{
      this.accomodationId = res.id
    })
   }

  ngOnInit(): void {
    this.form  = new FormGroup({
      accomodation : new FormControl('',Validators.required)
    });
    this.viewAccomodation()
  }

  viewAccomodation(){
    this.service.showSpinner();
    this.service.getApi(ApiUrls.view_accomodation +`?accomodationId=${this.accomodationId}` , 1).subscribe((res)=>{
      this.service.hideSpinner();
      if (res.responseCode==200){
        this.viewAccomodationData = res.result.accomodationName;
        this.form.patchValue({
          accomodation : this.viewAccomodationData
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

  updateaccomodation(){
    if (this.form.valid){
      const data ={
        accomodationId :this.accomodationId  ,
        accomodationName : this.form.value.accomodation
         }

      this.service.showSpinner();
      this.service.postApi(ApiUrls.update_accomodation , data , 1).subscribe((res)=>{
        this.service.hideSpinner();
        if (res.responseCode==200){
          this.router.navigate(['/group-mgt/manage-accomodation'])
          this.service.successToast('Accomodation updated successfully')
         }
        else{
          this.service.errorToast(res.responseMessage)
        }
      },err=>{
        this.service.hideSpinner();
       this.service.errorToast(err.responseMessage)
       })
    }else{
      this.service.errorToast('Accomodation Name is required')
    }
  }


}
