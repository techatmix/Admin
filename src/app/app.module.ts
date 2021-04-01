import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Import 3rd party components
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts';

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { LoginComponent } from './pages/login/login.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
// import { DashboardComponent } from './pages/dashboard/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';

import { DashboardComponent } from './pages/dashboard';
import { ToastrModule } from 'ngx-toastr';
import { NgOtpInputModule } from  'ng-otp-input';
import { OtpComponent } from './pages/otp/otp.component';
import { sidebarComponent } from './sidebar.component';
import {environment} from '../environments/environment';
import firebase from 'firebase/app';
import { UserInfoComponent } from './pages/dashboard/user-info/user-info.component'


// Import containers
const APP_CONTAINERS = [
  DashboardComponent
];

// Initialize Firebase
firebase.initializeApp(environment.firebaseConfig);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    ...APP_CONTAINERS,
    OtpComponent,
    sidebarComponent,
    UserInfoComponent
   
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BsDropdownModule.forRoot(),
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    PerfectScrollbarModule,
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    TabsModule.forRoot(),
    ChartsModule,
    NgxSpinnerModule,
    ToastrModule.forRoot({
      maxOpened: 1,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      timeOut: 2000
    }),
    NgOtpInputModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers:  [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
