import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminYearRoutingModule } from './admin-year-routing.module';
import { AdminYearComponent } from './admin-year.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    AdminYearComponent
  ],
  imports: [
    CommonModule,
    AdminYearRoutingModule,
    NgxPaginationModule
  ]
})
export class AdminYearModule { }
