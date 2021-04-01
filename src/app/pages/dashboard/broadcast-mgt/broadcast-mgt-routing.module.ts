import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BroadcastMgtComponent } from './broadcast-mgt.component';


const routes: Routes = [
  {path : '' , component : BroadcastMgtComponent , data : {title : "Broadcast Management"}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BroadcastMgtRoutingModule { }
