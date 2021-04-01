import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportMgtRoutingModule } from './report-mgt-routing.module';
import { ReportMgtComponent } from './report-mgt.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    ReportMgtComponent
  ],
  imports: [
    CommonModule,
    ReportMgtRoutingModule,
    NgxPaginationModule
  ]
})
export class ReportMgtModule { }
