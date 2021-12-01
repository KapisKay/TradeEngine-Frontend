import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TradingLiveRoutingModule } from './trading-live-routing.module';
import { TradingLiveComponent } from './trading-live.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TradingLiveComponent
  ],
  imports: [
    CommonModule,
    TradingLiveRoutingModule,
    ReactiveFormsModule
  ]
})
export class TradingLiveModule { }
