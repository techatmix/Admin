import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BroadcastMgtRoutingModule } from './broadcast-mgt-routing.module';
import { BroadcastMgtComponent } from './broadcast-mgt.component';
import {MatChipsModule} from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  declarations: [
    BroadcastMgtComponent
  ],
  imports: [
    CommonModule,
    BroadcastMgtRoutingModule,
    MatFormFieldModule,
    MatIconModule,
    MatChipsModule,
    MatInputModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class BroadcastMgtModule { }
