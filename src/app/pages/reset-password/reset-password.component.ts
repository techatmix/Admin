import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiUrls } from 'src/app/config/ApiUrls';
import { MainserviceService } from 'src/app/service/mainservice.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetPassword: FormGroup;
  resetId: any;

  constructor(private activatedroute: ActivatedRoute, public mainService: MainserviceService, public router: Router) { }

  ngOnInit() {
    this.resetPassword = new FormGroup({
      "password": new FormControl('', ([Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/)])),
      "confirmPassword": new FormControl('', [Validators.required])
    });
    this.activatedroute.params.subscribe((res) => {
      this.resetId = res.id
      console.log('res', this.resetId);
    })
  }

  resetApi() {
    if (this.resetPassword.valid) {
      const data = {
        userId : this.resetId,
        password: this.resetPassword.value.password,
        confirmPassword: this.resetPassword.value.confirmPassword,
      }
      this.mainService.showSpinner()
      this.mainService.putApi(ApiUrls.resetPassword, data, 0).subscribe((res: any) => {
        console.log('reset password response ==>', res);
        if (res.responseCode == 200) {
          this.mainService.hideSpinner();
          this.mainService.successToast(res.responseMessage)
          // this.resetId = res.result;
          this.router.navigateByUrl('/login')
        } else {
          this.mainService.hideSpinner();
          this.mainService.errorToast(res.responseMessage)
        }
      },(err)=>{
        this.mainService.hideSpinner()
      })
    }
    else {
      this.mainService.errorToast('Email is required.')
    }
  }

}
