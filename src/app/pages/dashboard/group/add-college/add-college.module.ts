import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddCollegeRoutingModule } from './add-college-routing.module';
import { AddCollegeComponent } from './add-college.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddCollegeComponent
  ],
  imports: [
    CommonModule,
    AddCollegeRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AddCollegeModule { }
