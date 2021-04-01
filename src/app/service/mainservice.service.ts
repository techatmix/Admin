import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
 import { ToastrService } from 'ngx-toastr';
 import { NgxSpinnerService } from "ngx-spinner";

declare var $ :any;

@Injectable({
  providedIn: 'root'
})
export class MainserviceService {
  month: any;
  day: any;
  daily: string;
  year: number;
  dtToday: Date;
  maxDate: string;
  public loginStatus = new Subject();
  public loginData = new Subject();
  profileData = new BehaviorSubject(``);
  permission = new BehaviorSubject(``);
  isToken = new BehaviorSubject(``);


  config = {
    allowNumbersOnly: true,
    length: 4,
    isPasswordInput: true,
    disableAutoFocus: true,
  };
  // baseURL = 'http://ec2-13-127-127-95.ap-south-1.compute.amazonaws.com:5000/api/v1/';
  baseURL = 'http://52.56.134.156:5000/api/v1/';

  constructor(public httpClient: HttpClient, private toastrService: ToastrService, public spinnerService: NgxSpinnerService) { }
 // ------------------ get past date block ---------------- // 
 public getPastBlock(){
 let  today  = new Date().toISOString();
    return today.slice(0,10);
 }

  // ---------------- get Api function -------------------- //
  getApi(endPointURL, isHeader): Observable<any> {
    var httpHeaders;
    if (isHeader == 0) {
      httpHeaders = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
    } else {
      httpHeaders = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'token': localStorage.getItem('token')
        })
      }
    }
    return this.httpClient.get(this.baseURL + endPointURL, httpHeaders)
  }


  // ---------------- post Api Function ------------------- //
  postApi(endPointURL, data, isHeader): Observable<any> {
    var httpHeaders;
    if (isHeader == 0) {
      httpHeaders = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
    }
   else if (isHeader == 3) {
      httpHeaders = {
        headers: new HttpHeaders({
          'token': localStorage.getItem('token')
        })
      }
    }
    else {
      httpHeaders = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'token': localStorage.getItem('token')
        })
      }
    }
    return this.httpClient.post(this.baseURL + endPointURL, data, httpHeaders)
  }


  // ------------------ put Api Function ----------------- //
  putApi(endPointURL, data, isHeader): Observable<any> {
    var httpHeaders;
    if (isHeader == 0) {
      httpHeaders = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
    } else {
      httpHeaders = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'token': localStorage.getItem('token')
        })
      }
    }
    return this.httpClient.put(this.baseURL + endPointURL, data, httpHeaders)
  }


  // ------------------ delete Api Function -------------- //
  deleteApi(endPointURL, bodyData, isHeader): Observable<any> {
    var httpHeaders;
    if (isHeader == 0) {
      httpHeaders = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
    } else {
      httpHeaders = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'token': localStorage.getItem('token')
        }),
        body: bodyData
      }
    }
    return this.httpClient.delete(this.baseURL + endPointURL, httpHeaders)
  }


  // check admin login or not
  public isLoggedIn() {
    return localStorage.getItem('token') !== null;
  }


  // logout
  public logout() {
    localStorage.removeItem('token')
  }

  // spinner service
  showSpinner() {
    this.spinnerService.show();
  }
  hideSpinner() {
    this.spinnerService.hide();

  }

  // toastr service
  successToast(msg) {
    this.toastrService.success(msg);
  }
  errorToast(msg) {
    this.toastrService.error(msg);
  }
  warningToast(msg) {
    this.toastrService.warning(msg);
  }
  infoToast(msg) {
    this.toastrService.info(msg);
  }

  /** to prevent first space */
  preventSpace(event) {
    if ((event.charCode == 32 || event.charCode == 64) && !event.target.value) {
      event.preventDefault();
    }
  }

  //get Country code

  getCountryCode(){
    return this.httpClient.get('assets/css/country.json')
  }

   // Block special character from name
   inputkeyPress(e){
    var k
    if (e.charCode == 32 && !e.target.value) {
      e.preventDefault()
      }
      else{
        document.all ? k = e.keyCode : k = e.which;
        return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8);
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
  // Only Alphabets Allowed Textbox:

  allowOnlyAlphabets(e){
    var k
    if (e.charCode == 32 && !e.target.value) {
      e.preventDefault()
      }
      else{
        e.which ? k = e.keyCode : k = e.which;
        return ((k > 64 && k < 91) || (k > 96 && k < 123));
      }
  }

  // No Special Characters Allowed, Just Alphabets & Numbers - With Spacebar
//   function noSpecialCharactersPlusSpace(e, t) {
//     try {
//         if (window.event) {
//             var charCode = window.evente.charCode == 32 &&.keyCode;
//         }
//         else if (e) {
//             var charCode = e.which;
//         }
//         else { return true; }
//         if ((charCode < 48 && charCode != 32) || (charCode > 57 && charCode < 65) || (charCode > 90 && charCode < 97) || charCode > 122)
//             return false;
//         else
//             return true;
//     }
//     catch (err) {
//         alert(err.Description);
//     }
// }
 //For password keypres
 passwordKeyPress(e){
  if (e.charCode == 32 && !e.target.value) {
    e.preventDefault()
    }
 }

 
//  No Special Characters Allowed, Just Alphabets & Numbers

  noSpecialCharacters(e) {
  try {
      if (e) {
          var charCode = e.charCode;
      }
      else if (e) {
          var charCode = e.which;
      }
      else { return true; }
      if (charCode < 48  || (charCode > 57 && charCode < 65) || (charCode > 90 && charCode < 97) || charCode > 122)
          return false;
      else
          return true;
  }
  catch (err) {
      alert(err.Description);
  }
}

  BlockFuture() {
    $(() => {
      this.dtToday = new Date();
      this.month = this.dtToday.getMonth() + 1;
      this.day = this.dtToday.getDate();
      this.year = this.dtToday.getFullYear();
      if (this.month < 10)
        this.month = '0' + this.month.toString();
      if (this.day < 10)
        this.day = '0' + this.day.toString();
      this.maxDate = this.year + '-' + this.month + '-' + this.day;
      $('#fromDate').attr('max', this.maxDate);
      $('#toDate').attr('max', this.maxDate);
    });
  }
}
