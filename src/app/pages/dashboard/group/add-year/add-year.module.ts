import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddYearRoutingModule } from './add-year-routing.module';
import { AddYearComponent } from './add-year.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddYearComponent
  ],
  imports: [
    CommonModule,
    AddYearRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AddYearModule { }
