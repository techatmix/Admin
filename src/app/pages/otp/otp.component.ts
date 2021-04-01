import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiUrls } from 'src/app/config/ApiUrls';
import { MainserviceService } from 'src/app/service/mainservice.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent implements OnInit {
  count:number = 60;
  userId: any;
  otpValue: any;
  constructor(private router : Router , private activatedroute : ActivatedRoute ,
    private service : MainserviceService ) {
      this.activatedroute.params.subscribe((res)=>{
        this.userId = res.id
      })
     }

  ngOnInit() {
    this.myInterVal();
  
  }

  myInterVal(){
    const interval =   setInterval(()=>{
      this.count = this.count-1;
      if (this.count == 0){
        clearInterval(interval)
     }
    },1000);
    
  }

  onOtpChange(event){
    if (event.length === 4){
      this.otpValue= event
    }
  }

  // Verify otp api integration 
   verifyOtp(){
    if (this.otpValue != ''){
      const data = {
        userId : this.userId,
         otp : this.otpValue
       }
      this.service.showSpinner()
      this.service.postApi(ApiUrls.verifyOtp, data, 0).subscribe((res: any) => {
        this.service.hideSpinner();
        if (res.responseCode == 200) {
          this.service.hideSpinner();
          console.log(res.responseMessage);
          
          this.service.successToast(res.responseMessage);
          this.router.navigate(['reset-password/'+res.result._id])
        }
        else{
          this.service.errorToast(res.responseMessage);
        }
      })
    }

   }

   resendOtp(){
    const data = {
      userId : this.userId
     }
    this.service.showSpinner()
    this.service.postApi(ApiUrls.resendOtp, data, 0).subscribe((res: any) => {
      if (res.responseCode == 200) {
         this.service.hideSpinner();
        this.service.successToast(res.responseMessage);
        // this.router.navigate(['reset-password/'+res.result._id])
      }
    })
   }

}
