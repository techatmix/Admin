import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { LoginComponent } from './pages/login/login.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { DashboardComponent } from './pages/dashboard';
import { OtpComponent } from './pages/otp/otp.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
    {path : 'login' , component : LoginComponent},
  {path :'forgot-password',component : ForgotPasswordComponent},
  {path : 'otp/:id', component : OtpComponent},
  {path :'reset-password/:id',component : ResetPasswordComponent},
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/dashboard/dashboard-page/dashboard-page.module').then(m => m.DashboardPageModule)
      },
      {
        path: 'my-profile',
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/my-profile/my-profile.module').then(m => m.MyProfileModule)
      },
      {
        path: 'edit-profile',
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/edit-profile/edit-profile.module').then(m => m.EditProfileModule)
      },
      {
        path: 'change-password',
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/change-password/change-password.module').then(m => m.ChangePasswordModule)
      },
      {
        path: 'user-mgt',
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/dashboard/user-mgt/user-mgt.module').then(m => m.UserMgtModule)
      },
      {
        path: 'role-mgt',
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/dashboard/role-mgt/role-mgt.module').then(m => m.RoleMgtModule)
      },
      {
        path: 'report-mgt',
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/dashboard/report-mgt/report-mgt.module').then(m => m.ReportMgtModule)
      },
      {
        path: 'add-subadmin',
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/dashboard/dashboard/add-subadmin/add-subadmin.module').then(m => m.AddSubadminModule)
      },
      {
        path: 'view-subadmin/:id',
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/dashboard/dashboard/view-subadmin/view-subadmin.module').then(m => m.ViewSubadminModule)
      },
      {
        path: 'edit-subadmin/:id',
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/dashboard/dashboard/edit-subadmin/edit-subadmin.module').then(m => m.EditSubadminModule)
      },
      {
        path: 'group-mgt',
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/dashboard/group-mgt/group-mgt.module').then(m => m.GroupMgtModule)
      },
      {
        path: 'add-group',
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/dashboard/group/add-group/add-group.module').then(m => m.AddGroupModule)
      },
      {
        path: 'edit-group/:id',
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/dashboard/group/edit-group/edit-group.module').then(m => m.EditGroupModule)
      },
      {
        path: 'view-group',
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/dashboard/group/view-group/view-group.module').then(m => m.ViewGroupModule)
      },
      {
        path: 'broadcast-mgt',
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/dashboard/broadcast-mgt/broadcast-mgt.module').then(m => m.BroadcastMgtModule)
      },
      {
        path: 'user-info',
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/dashboard/user-info/user-info.module').then(m => m.UserInfoModule)
      },
      {
        path: 'view-user/:id',
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/dashboard/view-user/view-user.module').then(m => m.ViewUserModule)
      },
      {
        path: 'manage-program',
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/dashboard/group/manage-program/manage-program.module').then(m => m.ManageProgramModule)
      },
      {
        path: 'manage-college',
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/dashboard/group/manage-college/manage-college.module').then(m => m.ManageCollegeModule)
      },
      {
        path: 'manage-accomodation',
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/dashboard/group/manage-accomodation/manage-accomodation.module').then(m => m.ManageAccomodationModule)
      },
      {
        path: 'add-college',
        canActivate: [AuthGuard],

        loadChildren: () => import('./pages/dashboard/group/add-college/add-college.module').then(m => m.AddCollegeModule)
      },
      {
        path: 'edit-college/:id',
        canActivate: [AuthGuard],

        loadChildren: () => import('./pages/dashboard/group/edit-college/edit-college.module').then(m => m.EditCollegeModule)
      },
      {
        path: 'edit-program/:id',
        canActivate: [AuthGuard],

        loadChildren: () => import('./pages/dashboard/group/edit-program/edit-program.module').then(m => m.EditProgramModule)
      },
      {
        path: 'add-accomodation',
        canActivate: [AuthGuard],

        loadChildren: () => import('./pages/dashboard/group/add-accomodation/add-accomodation.module').then(m => m.AddAccomodationModule)
      },
      {
        path: 'edit-accomodation/:id',
        canActivate: [AuthGuard],

        loadChildren: () => import('./pages/dashboard/group/edit-accomodation/edit-accomodation.module').then(m => m.EditAccomodationModule)
      },
      {
        path: 'admin-year',
        canActivate: [AuthGuard],

        loadChildren: () => import('./pages/dashboard/group/admin-year/admin-year.module').then(m => m.AdminYearModule)
      },
      {
        path: 'add-year',
        canActivate: [AuthGuard],

        loadChildren: () => import('./pages/dashboard/group/add-year/add-year.module').then(m => m.AddYearModule)
      },
      {
        path: 'report-detail',
        canActivate: [AuthGuard],

        loadChildren: () => import('./pages/dashboard/report-detail/report-detail.module').then(m => m.ReportDetailModule)
      },
     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
