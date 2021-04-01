import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddSubadminRoutingModule } from './add-subadmin-routing.module';
import { AddSubadminComponent } from './add-subadmin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainserviceService } from 'src/app/service/mainservice.service';


@NgModule({
  declarations: [
    AddSubadminComponent
  ],
  imports: [
    CommonModule,
    AddSubadminRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers : [
    MainserviceService,
  ]

})
export class AddSubadminModule { }
