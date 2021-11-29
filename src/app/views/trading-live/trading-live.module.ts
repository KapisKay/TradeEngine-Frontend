import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TradingLiveRoutingModule } from './trading-live-routing.module';
import { TradingLiveComponent } from './trading-live.component';


@NgModule({
  declarations: [
    TradingLiveComponent
  ],
  imports: [
    CommonModule,
    TradingLiveRoutingModule
  ]
})
export class TradingLiveModule { }
