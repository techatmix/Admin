import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiUrls } from './config/ApiUrls';
import { MainserviceService } from './service/mainservice.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  expireToken: any;
  token: string;
  constructor(
    private router: Router,private service : MainserviceService
) { 
  this.service.isToken.subscribe((res)=>{
    console.log(res,'token');
    this.expireToken =  res;
  })
}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot)  {
      console.log(this.expireToken);
      this.token = localStorage.getItem('token')? localStorage.getItem('token') : '';
      this.expireToken =  localStorage.getItem('responseCode') ? localStorage.getItem('responseCode')  : "";
      if ((this.token =='') ||  (this.expireToken == 401) ){
            this.service.errorToast('Your token is expired , please login again.')
            this.router.navigate(['/login']);
            return false;
      }
    return true;
  }

  // get profile
  getProfile() {
   this.service.getApi(ApiUrls.profile, 1).subscribe((res: any) => {
    if (res.responseCode == 401) {
        this.expireToken = res.responseCode
     }else{
      this.expireToken = res.responseCode
     }
   },err=>{
    this.service.hideSpinner();

   })
 }
  
}
