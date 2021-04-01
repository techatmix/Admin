import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { DashboardPageComponent } from './dashboard-page.component';

// import { DashboardComponent } from './dashboard.component';
 import { DashboardPageRoutingModule } from './dashboard-page-routing.module';

@NgModule({
  imports: [
    FormsModule,
    DashboardPageRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot()
  ],
  declarations: [ DashboardPageComponent ]
})
export class DashboardPageModule { }
