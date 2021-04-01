import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditSubadminComponent } from './edit-subadmin.component';


const routes: Routes = [
  {path : '' , component : EditSubadminComponent , data :{title :"Edit Subadmin"}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditSubadminRoutingModule { }
