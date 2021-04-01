import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiUrls } from 'src/app/config/ApiUrls';
import { MainserviceService } from 'src/app/service/mainservice.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  form: FormGroup;
  resetId: any;

  constructor(private router: Router, public mainService: MainserviceService) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl('', Validators.compose([Validators.required, Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})+$/)]))
    })
  }

  get f() { return this.form.controls }

  submit() {
    if (this.form.valid) {
      const data = {
        email: this.form.value.email
      }
      this.mainService.showSpinner()
      this.mainService.postApi(ApiUrls.forgotPassword, data, 0).subscribe((res: any) => {
        console.log('forgot password response==>', res);
        if (res.responseCode == 200) {
          this.mainService.hideSpinner()
          this.mainService.successToast(res.responseMessage)
          this.resetId = res.result;
          this.form.reset();
          this.router.navigate(['otp/'+ this.resetId])
        } else {
          this.mainService.hideSpinner()
          this.mainService.errorToast(res.responseMessage)
        }
      })
    }
    else {
      
      this.mainService.errorToast('Email is required.')
      console.log('Email is required.');
    }

  }

}
