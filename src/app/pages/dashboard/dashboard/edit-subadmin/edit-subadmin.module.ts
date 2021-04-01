import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditSubadminComponent } from './edit-subadmin.component';

import { EditSubadminRoutingModule } from './edit-subadmin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainserviceService } from 'src/app/service/mainservice.service';

@NgModule({
  declarations: [
    EditSubadminComponent
  ],
  imports: [
    CommonModule,
    EditSubadminRoutingModule,
    FormsModule,
    ReactiveFormsModule
    
  ],
  providers : [
    MainserviceService,
  ]
})
export class EditSubadminModule { }
