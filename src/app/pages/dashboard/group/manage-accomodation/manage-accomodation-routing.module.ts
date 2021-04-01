import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageAccomodationComponent } from './manage-accomodation.component';


const routes: Routes = [
  {path : '' , component : ManageAccomodationComponent , data :{title :"Manage Accomodation"}}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageAccomodationRoutingModule { }
