import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupMgtRoutingModule } from './group-mgt-routing.module';
import { GroupMgtComponent } from './group-mgt.component';
import {NgxPaginationModule} from 'ngx-pagination'; 


@NgModule({
  declarations: [
    GroupMgtComponent
  ],
  imports: [
    CommonModule,
    GroupMgtRoutingModule,
    NgxPaginationModule
  ]
})
export class GroupMgtModule { }
