import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditAccomodationRoutingModule } from './edit-accomodation-routing.module';
import { EditAccomodationComponent } from './edit-accomodation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EditAccomodationComponent
  ],
  imports: [
    CommonModule,
    EditAccomodationRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class EditAccomodationModule { }
