import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageCollegeComponent } from './manage-college.component';


const routes: Routes = [
  {path : '' , component : ManageCollegeComponent , data :{title :"Manage College"}}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageCollegeRoutingModule { }
