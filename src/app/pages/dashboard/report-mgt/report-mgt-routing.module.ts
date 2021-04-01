import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportMgtComponent } from './report-mgt.component';


const routes: Routes = [
  {path :"",component : ReportMgtComponent , data : {title : "User Information"}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportMgtRoutingModule { }
