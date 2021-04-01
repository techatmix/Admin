import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoleMgtRoutingModule } from './role-mgt-routing.module';
import { RoleMgtComponent } from './role-mgt.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RoleMgtComponent
  ],
  imports: [
    CommonModule,
    RoleMgtRoutingModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RoleMgtModule { }
