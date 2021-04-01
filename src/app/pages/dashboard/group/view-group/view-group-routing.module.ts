import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewGroupComponent } from './view-group.component';


const routes: Routes = [
  {path : "" , component : ViewGroupComponent , data :{title :"Add Program"}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewGroupRoutingModule { }
