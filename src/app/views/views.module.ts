import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewsComponent } from './views.component';
import { ViewsRoutingModule } from './views-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HearderModule } from '../component/hearder/hearder.module';
import { SidebarModule } from '../component/sidebar/sidebar.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    ViewsComponent],
  imports: [
    CommonModule,
    ViewsRoutingModule,
    HearderModule,
    SidebarModule,
    NgbModule
  ]
})
export class ViewsModule { }
