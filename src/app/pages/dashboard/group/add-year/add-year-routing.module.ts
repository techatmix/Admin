import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddYearComponent } from './add-year.component';


const routes: Routes = [
  {path : '' , component : AddYearComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddYearRoutingModule { }
