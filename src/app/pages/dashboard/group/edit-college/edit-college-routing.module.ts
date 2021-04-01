import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditCollegeComponent } from './edit-college.component';


const routes: Routes = [
  {path : '' , component : EditCollegeComponent , data :{title :"Edit College"}}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditCollegeRoutingModule { }
