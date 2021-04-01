import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddCollegeComponent } from './add-college.component';


const routes: Routes = [
  {path : '' , component : AddCollegeComponent , data :{title :"Add College"}}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddCollegeRoutingModule { }
