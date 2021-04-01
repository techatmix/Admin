import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiUrls } from 'src/app/config/ApiUrls';
import { MainserviceService } from 'src/app/service/mainservice.service';

@Component({
  selector: 'app-edit-subadmin',
  templateUrl: './edit-subadmin.component.html',
  styleUrls: ['./edit-subadmin.component.scss']
})
export class EditSubadminComponent implements OnInit {
  editSubadminForm : FormGroup;
  file: any;
  imageType: any;
  imageUrl: any;
  countryArr: any = [];
  userId: any;
  viewSubadmin: any;
  permission: any;

  constructor(private service : MainserviceService , private router : Router , private activatedroute : ActivatedRoute) { 
    this.activatedroute.params.subscribe((res)=>{
      this.userId = res.id
    })
  }
  ngOnInit() {
   this.editSubadminFormValidation();
   this.viewSubadminApi() 

  }


  viewSubadminApi() {
  
    this.service.showSpinner();
    this.service.getApi(ApiUrls.viewSubadmin + `?userId=${this.userId}` ,1).subscribe((res)=>{
     this.service.hideSpinner();
     if (res.responseCode==200){
       this.viewSubadmin = res.result ?  res.result : [] ;  
       this.permission = this.viewSubadmin.permissions[0]

       this.editSubadminForm.patchValue({
        firstName : this.viewSubadmin.firstName,
        lastName :  this.viewSubadmin.lastName,
        email : this.viewSubadmin.email ,
        phoneCode : this.viewSubadmin.countryCode,
        phoneNumber : this.viewSubadmin.mobileNumber,
        dashboard : this.permission.dashboard,
        userManagement : this.permission.userManagement,
        problemReport : this.permission.problemReport,
        groupManagement : this.permission.groupManagement,
        broadcastManagement : this.permission.broadcastManagement,
        reportManagement : this.permission.reportManagement,

       });
        this.imageUrl = this.viewSubadmin.profilePic
      }
     else{
      this.viewSubadmin = res.result ?  res.result : [] ;  
       this.service.errorToast(res.responseMessage)
     }
   },err=>{
     this.service.hideSpinner();
    this.service.errorToast(err.responseMessage)
    })
  }


  // Add Subadmin Form Validation
  
  editSubadminFormValidation(){
    this.editSubadminForm = new FormGroup({
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
      //  'programManagement' : new FormControl(false)
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

  editSubAdminApi(){
    if ( this.editSubadminForm.valid){
      const data = {
        'firstName' : this.editSubadminForm.value.firstName,
        'lastName' : this.editSubadminForm.value.lastName,
        'email' : this.editSubadminForm.value.email,           
        'countryCode' : this.editSubadminForm.value.phoneCode,
        'mobileNumber' : this.editSubadminForm.value.phoneNumber,
        'profilePic' : this.imageUrl ,
        'password' : this.editSubadminForm.value.password,
        'dashboard' :  this.editSubadminForm.value.dashboard,
        'userManagement' :  this.editSubadminForm.value.userManagement,
        'groupManagement' :  this.editSubadminForm.value.groupManagement,
         'problemReport' :  this.editSubadminForm.value.problemReport,
        'broadcastManagement' : this.editSubadminForm.value.broadcastManagement,
        'reportManagement' : this.editSubadminForm.value.reportManagement
     };
     this.service.showSpinner();
     this.service.putApi(ApiUrls.editSubadmin + `?userId=${this.userId}`, data ,1).subscribe((res)=>{
       this.service.hideSpinner();
       if (res.responseCode == 200){
         this.router.navigate(['/role-mgt']);
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
