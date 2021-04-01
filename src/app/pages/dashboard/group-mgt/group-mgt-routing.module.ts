import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddYearComponent } from '../group/add-year/add-year.component';
import { AdminYearComponent } from '../group/admin-year/admin-year.component';
import { ManageAccomodationComponent } from '../group/manage-accomodation/manage-accomodation.component';
import { ManageCollegeComponent } from '../group/manage-college/manage-college.component';
import { ManageProgramComponent } from '../group/manage-program/manage-program.component';
import { GroupMgtComponent } from './group-mgt.component';


const routes: Routes = [
  {path : ''  , data :{title : "Manage University"},
  children: [
    {
      path: '',
      redirectTo: 'group-mgt',
    },
    {
      path: 'group-mgt',
      component : GroupMgtComponent,
      data :{
        title : "Manage University"
      },
    },
    {
      path: 'manage-program',
      component : ManageProgramComponent,
      data :{
        title : "Manage Program"
      }
    },
    {
      path: 'manage-college',
      component : ManageCollegeComponent,
      data :{
        title : "Manage College"
      }
    },
    {
      path: 'manage-accomodation',
      component : ManageAccomodationComponent,
      data :{
        title : "Manage Accomodation"
      }
    },
    {
      path: 'admin-year',
      component : AdminYearComponent,
      data :{
        title : "Manage Years"
      }
    }
  
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupMgtRoutingModule { }
