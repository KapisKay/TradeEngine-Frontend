import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TradingLiveComponent } from './trading-live.component';

const routes: Routes = [
  {
    path: '',
    component: TradingLiveComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TradingLiveRoutingModule { }
