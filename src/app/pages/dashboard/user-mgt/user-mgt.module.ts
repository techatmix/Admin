import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserMgtRoutingModule } from './user-mgt-routing.module';
import { UserMgtComponent } from './user-mgt.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import {NgxPaginationModule} from 'ngx-pagination'; 


@NgModule({
  declarations: [
    UserMgtComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UserMgtRoutingModule,
     BsDropdownModule.forRoot(),
     ButtonsModule.forRoot(),
     NgxPaginationModule

  ]
})
export class UserMgtModule { }
