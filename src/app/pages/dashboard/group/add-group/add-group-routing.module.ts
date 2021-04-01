import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddGroupComponent } from './add-group.component';


const routes: Routes = [
  {path :'', component : AddGroupComponent , data : {title : "Add University"}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddGroupRoutingModule { }
