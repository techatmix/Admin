import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewGroupRoutingModule } from './view-group-routing.module';
import { ViewGroupComponent } from './view-group.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ViewGroupComponent
  ],
  imports: [
    CommonModule,
    ViewGroupRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ViewGroupModule { }
