import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddSubadminComponent } from './add-subadmin.component';


const routes: Routes = [
  {path : "",component : AddSubadminComponent,  data: {
    title: 'Add Subadmin'
  }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddSubadminRoutingModule { }
