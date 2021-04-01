import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiUrls } from 'src/app/config/ApiUrls';
import { MainserviceService } from 'src/app/service/mainservice.service';
// import { ApiUrls } from 'src/app/config/api-urls/api-urls';
@Component({
  selector: 'app-add-subadmin',
  templateUrl: './add-subadmin.component.html',
  styleUrls: ['./add-subadmin.component.scss']
})
export class AddSubadminComponent implements OnInit {
  addSubAdminForm : FormGroup;
  file: any;
  imageType: any;
  imageUrl: any;
  countryArr: any = [];
    constructor(private service : MainserviceService , private router : Router) { }

  ngOnInit() {
   this.addSubAdminFormValidation();
  }

  // Add Subadmin Form Validation
  
  addSubAdminFormValidation(){
    this.addSubAdminForm = new FormGroup({
      'file' : new FormControl(''),
      'firstName': new FormControl('', Validators.compose([Validators.required,Validators.maxLength(62), Validators.pattern(/^[^\s][a-zA-Z ]*$/)]) ),
      'lastName' : new FormControl(''),
       'phoneCode' : new FormControl('+1'),
      "email": new FormControl('', ([Validators.required, Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/i), Validators.maxLength(50)])),
      "phoneNumber":new FormControl('',([Validators.required,Validators.pattern(/^[1-9][0-9]{9,13}$/)])),
     "password": new FormControl('', Validators.compose([Validators.required, Validators.minLength(8),Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/)])),
      "confirmPassword": new FormControl('', Validators.compose([Validators.required, Validators.minLength(8)])),
      'dashboard' : new FormControl(false),
      'userManagement' : new FormControl(false),
       'problemReport' : new FormControl(false),
      'groupManagement' : new FormControl(false),
      'broadcastManagement' : new FormControl(false),
      'reportManagement' : new FormControl(false),

    })
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

  uploadImage(){
    this.service.showSpinner();
    const formData:FormData = new FormData();
    formData.append('image', this.file[0])
    this.service.postApi(ApiUrls.uploadImage,formData, 3).subscribe((res: any) => {
      this.service.hideSpinner();
      if (res.responseCode == 200) {
        this.imageUrl =  res.result.image;
      } 
    })
  }

   // Block special character from name
   inputkeyPress(e){
    var k
    if (e.charCode == 32 && !e.target.value) {
      e.preventDefault()
      }
      else{
        document.all ? k = e.keyCode : k = e.which;
        return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32);
      }
  }
  //Allow only numbers
  inputKeyPress(e){
    var k
    if (e.charCode == 32 && !e.target.value) {
      e.preventDefault()
      }
      else{
        document.all ? k = e.keyCode : k = e.which;
        return ((k > 47 && k < 58) || k == 8);
      }
  }

 //For password keypres
 passwordKeyPress(e){
  if (e.charCode == 32 && !e.target.value) {
    e.preventDefault()
    }
 }

 getCountryCodeData(){
  this.service.getCountryCode().subscribe((res)=>{
    this.countryArr = res
  })
}

  addSubAdminApi(){
    if (this.addSubAdminForm.valid){
      const data = {
        'firstName' : this.addSubAdminForm.value.firstName,
        'lastName' : this.addSubAdminForm.value.lastName,
        'email' : this.addSubAdminForm.value.email,           
        'countryCode' : this.addSubAdminForm.value.phoneCode,
        'mobileNumber' : this.addSubAdminForm.value.phoneNumber,
        'profilePic' : this.imageUrl ,
        'password' : this.addSubAdminForm.value.password,
       'dashboard' :  this.addSubAdminForm.value.dashboard,
       'userManagement' :  this.addSubAdminForm.value.userManagement,
       'groupManagement' :  this.addSubAdminForm.value.groupManagement,
        'problemReport' :  this.addSubAdminForm.value.problemReport,
        'reportManagement' : this.addSubAdminForm.value.reportManagement,
       'broadcastManagement' : this.addSubAdminForm.value.broadcastManagement
       
     };
     this.service.showSpinner();
     this.service.postApi(ApiUrls.addSubadmin, data ,1).subscribe((res)=>{
       this.service.hideSpinner();
       if (res.responseCode == 200){
         this.router.navigate(['role-mgt']);
         this.service.successToast(res.responseMessage)
       }
       else{
         this.service.errorToast(res.responseMessage)
       }
     })
    }else{
      this.service.errorToast('All fields are required.')

    }
    
  }

}
