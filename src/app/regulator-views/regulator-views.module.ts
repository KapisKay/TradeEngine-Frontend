import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegulatorViewsRoutingModule } from './regulator-views-routing.module';
import { RegulatorViewsComponent } from './regulator-views.component';
import { HearderModule } from '../component/hearder/hearder.module';
import { SidebarModule } from '../component/sidebar/sidebar.module';
import { FooterModule } from '../component/footer/footer.module';


@NgModule({
  declarations: [
    RegulatorViewsComponent
  ],
  imports: [
    CommonModule,
    RegulatorViewsRoutingModule,
    HearderModule,
    SidebarModule,
    FooterModule,
  ]
})
export class RegulatorViewsModule { }
