import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageProgramRoutingModule } from './manage-program-routing.module';
import { ManageProgramComponent } from './manage-program.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    ManageProgramComponent
  ],
  imports: [
    CommonModule,
    ManageProgramRoutingModule,
    NgxPaginationModule
  ]
})
export class ManageProgramModule { }
