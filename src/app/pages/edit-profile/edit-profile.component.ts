import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiUrls } from 'src/app/config/ApiUrls';
import { MainserviceService } from 'src/app/service/mainservice.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  profileData: any = {};
  editProfileStatus : boolean = false; 
  imageType: any;
  file: any;
  imageUrl: any;
  form : FormGroup;
  countryArr: any = [];
  constructor(private router : Router,public mainService : MainserviceService) { }

  ngOnInit() {
    this.formValidation();
     this.getProfile();
    // this.getCountryCodeData();

  }
  changePassword(){
    this.router.navigate(['change-password'])
  }

  // get profile
  getProfile() {
     this.mainService.showSpinner()
    this.mainService.getApi(ApiUrls.profile, 1).subscribe((res: any) => {
      console.log("sidebar profile response ==>", res);
      if (res.responseCode == 200) {
        this.profileData = res.result;
        this.imageUrl = this.profileData.profilePic
        this.form.patchValue({
          'firstName': this.profileData.firstName,
          'lastName' : this.profileData.lastName,
          "email":  this.profileData.email,
          "phoneNumber":this.profileData.mobileNumber,
          phone_code : this.profileData.countryCode
        })
        this.mainService.hideSpinner();
      } else {
        this.mainService.hideSpinner();
      }
    })
  }

  uploadImage(){
    this.mainService.showSpinner();
    const formData:FormData = new FormData();
    formData.append('image', this.file[0])
    this.mainService.postApi(ApiUrls.uploadImage,formData, 3).subscribe((res: any) => {
      this.mainService.hideSpinner();
      if (res.responseCode == 200) {
        this.imageUrl =  res.result.image;
        this.mainService.profileData.next(this.imageUrl);
       
      } 
    })
  }

 

  updateApi(){
    if (this.form.valid){
      const data = {
        firstName : this.form.value.firstName,
        lastName : this.form.value.lastName,
        email : this.form.value.email,
        mobileNumber : this.form.value.phoneNumber,
        countryCode  :  this.form.value.phone_code,
        profilePic  : this.imageUrl
      }
        this.mainService.showSpinner()
        this.mainService.putApi(ApiUrls.editProfile,data,1).subscribe((res)=>{
          this.mainService.hideSpinner()
        if (res.responseCode== 200){
          this.mainService.successToast(res.responseMessage);
          this.getProfile();
          this.imageUrl = res.result.profilePic;
          this.mainService.profileData.next(this.imageUrl);
          this.router.navigate(['/my-profile'])
        }
        else{
          this.mainService.errorToast(res.responseMessage);
  
        }
      },err=>{
        this.mainService.errorToast(err.responseMessage);
      })
    }else{
      this.mainService.errorToast('All fields are required')
    }
  }

  back(){
    this.editProfileStatus = false;
  }

  editprofile(){
    this.editProfileStatus = false;

  }

  ValidateFileUpload(event) {
    this.file = event.target.files;
    if (this.file[0]) {
      this.imageType = this.file[0].type;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
        this.uploadImage()
      };
      reader.readAsDataURL(this.file[0]);
    }
  }

   


  getCountryCodeData(){
    this.mainService.getCountryCode().subscribe((res)=>{
      this.countryArr = res
    })
  }

  formValidation(){
    this.form = new FormGroup({
      'firstName': new FormControl({value:'',disabled: false}, Validators.compose([Validators.required,Validators.maxLength(62), Validators.pattern(/^[^\s][a-zA-Z ]*$/)]) ),
       'lastName' : new FormControl({value:'',disabled: false}),
       'phone_code' : new FormControl('+1'),
      "email": new FormControl({value:'',disabled: true}),
      'file' : new FormControl(''),
      "phoneNumber":new FormControl({value:'',disabled: false},([Validators.required,Validators.pattern(/^[1-9][0-9]{9,13}$/)])),
   
    })
  }

}
