import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditGroupComponent } from './edit-group.component';


const routes: Routes = [
  {path :'', component : EditGroupComponent , data : {title : "Edit University"}}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditGroupRoutingModule { }
