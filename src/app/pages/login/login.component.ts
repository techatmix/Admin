import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiUrls } from 'src/app/config/ApiUrls';
import { MainserviceService } from 'src/app/service/mainservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public mainService : MainserviceService , private router : Router) { }
  loginForm : FormGroup;
  ngOnInit(): void {
    localStorage.clear()
   this.loginFormValidation();
  }

  loginFormValidation() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,10}|[0-9]{1,3})(\]?)$/i)]),
      password: new FormControl('', Validators.required),
    });
  }


  login() {
    let data = {
      'email': this.loginForm.value.email,
      'password': this.loginForm.value.password
    }
    this.mainService.showSpinner()
    this.mainService.postApi(ApiUrls.login, data, 0).subscribe((res: any) => {
      console.log("login response ==>", res)
      if (res.responseCode == 200) {
        this.mainService.hideSpinner();
        this.mainService.successToast(res.responseMessage)
        localStorage.setItem('token', res.result.token);
        // localStorage.setItem('adminId',res.result._id)
         localStorage.setItem('userType',window.btoa(res.result.userType))
        this.mainService.loginStatus.next(true)
        this.router.navigate(['dashboard'])
      } else {
        
        this.mainService.hideSpinner();
        this.mainService.errorToast(res.responseMessage)
      }
    })
 
  }


}
