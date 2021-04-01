import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageProgramComponent } from './manage-program.component';


const routes: Routes = [
  {path : '' , component : ManageProgramComponent , data :{title :"Manage Program"}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageProgramRoutingModule { }
