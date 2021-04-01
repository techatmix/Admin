import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportDetailRoutingModule } from './report-detail-routing.module';
import { ReportDetailComponent } from './report-detail.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    ReportDetailComponent
  ],
  imports: [
    CommonModule,
    ReportDetailRoutingModule,
    NgxPaginationModule
  ]
})
export class ReportDetailModule { }
