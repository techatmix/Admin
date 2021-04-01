import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditGroupRoutingModule } from './edit-group-routing.module';
import { EditGroupComponent } from './edit-group.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EditGroupComponent
  ],
  imports: [
    CommonModule,
    EditGroupRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class EditGroupModule { }
