import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminViewsRoutingModule } from './admin-views-routing.module';
import { AdminViewsComponent } from './admin-views.component';
import { HearderModule } from '../component/hearder/hearder.module';
import { SidebarModule } from '../component/sidebar/sidebar.module';
import { FooterModule } from '../component/footer/footer.module';


@NgModule({
  declarations: [
    AdminViewsComponent
  ],
  imports: [
    CommonModule,
    AdminViewsRoutingModule,
    HearderModule,
    SidebarModule,
    FooterModule
  ]
})
export class AdminViewsModule { }
