import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageAccomodationRoutingModule } from './manage-accomodation-routing.module';
import { ManageAccomodationComponent } from './manage-accomodation.component';
import {NgxPaginationModule} from 'ngx-pagination'; 


@NgModule({
  declarations: [
    ManageAccomodationComponent
  ],
  imports: [
    CommonModule,
    ManageAccomodationRoutingModule,
    NgxPaginationModule
  ]
})
export class ManageAccomodationModule { }
