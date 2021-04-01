import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditProgramComponent } from './edit-program.component';


const routes: Routes = [
  {path :'', component : EditProgramComponent , data : {title : "Edit Program"}}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditProgramRoutingModule { }
