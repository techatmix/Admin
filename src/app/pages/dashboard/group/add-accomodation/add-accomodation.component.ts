import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiUrls } from 'src/app/config/ApiUrls';
import { MainserviceService } from 'src/app/service/mainservice.service';

@Component({
  selector: 'app-add-accomodation',
  templateUrl: './add-accomodation.component.html',
  styleUrls: ['./add-accomodation.component.scss']
})
export class AddAccomodationComponent implements OnInit {
  form: any;

  constructor(public service : MainserviceService , private router : Router) { }

  ngOnInit(): void {
    this.form  = new FormGroup({
      accomodation : new FormControl('',Validators.required)
    })
  }

  Addaccomodation(){
    if (this.form.valid){
      const data ={
        accomodationName : this.form.value.accomodation
         }

      this.service.showSpinner();
      this.service.postApi(ApiUrls.add_accomodation , data , 1).subscribe((res)=>{
        this.service.hideSpinner();
        if (res.responseCode==200){
          this.router.navigate(['/group-mgt/manage-accomodation'])
          this.service.successToast('Accomodation addedd successfully')
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
