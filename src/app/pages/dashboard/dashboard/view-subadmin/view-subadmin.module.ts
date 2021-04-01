import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewSubadminRoutingModule } from './view-subadmin-routing.module';
import { ViewSubadminComponent } from './view-subadmin.component';


@NgModule({
  declarations: [
    ViewSubadminComponent
  ],
  imports: [
    CommonModule,
    ViewSubadminRoutingModule
  ]
})
export class ViewSubadminModule { }
