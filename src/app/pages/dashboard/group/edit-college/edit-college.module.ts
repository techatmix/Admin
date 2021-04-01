import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditCollegeRoutingModule } from './edit-college-routing.module';
import { EditCollegeComponent } from './edit-college.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EditCollegeComponent
  ],
  imports: [
    CommonModule,
    EditCollegeRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class EditCollegeModule { }
