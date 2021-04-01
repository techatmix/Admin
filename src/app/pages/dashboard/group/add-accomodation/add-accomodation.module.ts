import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddAccomodationRoutingModule } from './add-accomodation-routing.module';
import { AddAccomodationComponent } from './add-accomodation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddAccomodationComponent
  ],
  imports: [
    CommonModule,
    AddAccomodationRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AddAccomodationModule { }
