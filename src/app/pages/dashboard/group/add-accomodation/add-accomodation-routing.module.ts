import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddAccomodationComponent } from './add-accomodation.component';


const routes: Routes = [
  {path : '' , component : AddAccomodationComponent , data :{title :"Add Accomodation"}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddAccomodationRoutingModule { }
