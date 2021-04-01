import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminYearComponent } from './admin-year.component';


const routes: Routes = [
  {path : '' , component : AdminYearComponent , data : {title : 'Manage Year'}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminYearRoutingModule { }
