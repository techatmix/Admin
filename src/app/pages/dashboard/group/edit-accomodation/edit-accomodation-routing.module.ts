import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditAccomodationComponent } from './edit-accomodation.component';


const routes: Routes = [
  {path : "" , component : EditAccomodationComponent , data : {title:"Edit Accomodation"}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditAccomodationRoutingModule { }
