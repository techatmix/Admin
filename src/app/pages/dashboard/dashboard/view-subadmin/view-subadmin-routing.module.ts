import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewSubadminComponent } from './view-subadmin.component';


const routes: Routes = [
  {path : "" , component : ViewSubadminComponent , data :{title : "View Subadmin"}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewSubadminRoutingModule { }
