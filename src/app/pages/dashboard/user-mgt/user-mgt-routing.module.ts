import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserMgtComponent } from './user-mgt.component';


const routes: Routes = [
  {
    path: '',
    component: UserMgtComponent,
    data: {
      title: 'User Management'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserMgtRoutingModule { }
