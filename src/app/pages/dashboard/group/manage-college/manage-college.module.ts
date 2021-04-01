import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageCollegeRoutingModule } from './manage-college-routing.module';
import { ManageCollegeComponent } from './manage-college.component';
import {NgxPaginationModule} from 'ngx-pagination'; 


@NgModule({
  declarations: [
    ManageCollegeComponent
  ],
  imports: [
    CommonModule,
    ManageCollegeRoutingModule,
    NgxPaginationModule
  ]
})
export class ManageCollegeModule { }
