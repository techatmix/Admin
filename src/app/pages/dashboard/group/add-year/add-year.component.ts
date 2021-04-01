import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiUrls } from 'src/app/config/ApiUrls';
import { MainserviceService } from 'src/app/service/mainservice.service';

@Component({
  selector: 'app-add-year',
  templateUrl: './add-year.component.html',
  styleUrls: ['./add-year.component.scss']
})
export class AddYearComponent implements OnInit {
  groupList: any = [];
  programList: any = [];
  form: FormGroup;

  constructor(public service : MainserviceService , private router : Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      year : new FormControl('', Validators.compose([Validators.required,Validators.minLength(4)])),
      
    })
 
  }

 

  addYear(){
    if (this.form.valid){
      if ( this.form.value.year < 1900){
        this.service.errorToast('Only 1900 or after 1900 year is allowed');
        return
      } else{
        const data = {
          year : Number(this.form.value.year),
        
    
        }
        this.service.showSpinner();
        this.service.postApi(ApiUrls.add_year ,data ,1).subscribe((res)=>{
         this.service.hideSpinner();
         if (res.responseCode==200){
          this.service.successToast('Year added successfully')
            this.router.navigate(['/group-mgt/admin-year'])
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
      else{
          this.service.errorToast('year required')
        }
    
  }

}
