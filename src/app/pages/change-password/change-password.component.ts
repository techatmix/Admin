import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiUrls } from 'src/app/config/ApiUrls';
import { MainserviceService } from 'src/app/service/mainservice.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  form : FormGroup;
  constructor(public mainService : MainserviceService , private router : Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'oldPassword' : new FormControl('', Validators.required),
      "newPassword": new FormControl('', Validators.compose([Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/)])),
      'confirmPassword' : new FormControl('', Validators.required),
    })
  }

  // Change password Api integration 

  changePasswordApi() {
      const data = {
        oldPassword :this.form.value.oldPassword,
        newPassword: this.form.value.newPassword,
        confirmPassword: this.form.value.confirmPassword,
      }
      this.mainService.showSpinner()
      this.mainService.putApi(ApiUrls.changePassword, data, 1).subscribe((res: any) => {
        if (res.responseCode == 200) {
          this.mainService.hideSpinner();
          this.mainService.successToast(res.responseMessage)
          // this.resetId = res.result;
          this.router.navigateByUrl('/my-profile')
        } else {
          this.mainService.hideSpinner();
          this.mainService.errorToast(res.responseMessage)
        }
      },(err)=>{
        this.mainService.hideSpinner()
      })
    
  }


}
