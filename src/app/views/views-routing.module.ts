import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewsComponent } from './views.component';

const routes: Routes = [   
  {
    path: 'authentication',
    loadChildren: () =>
      import('./authentication/authentication.module').then(
        (module) => module.AuthenticationModule
      ),
  },                                                                                                                
  
  {
    path: '',
    component: ViewsComponent,
    // canActivate: [AuthGuard, ClientGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then(
            (module) => module.DashboardModule
          ),
      },
      {
        path: 'trading-live',
        loadChildren: () =>
          import('./trading-live/trading-live.module').then(
            (module) => module.TradingLiveModule
          ),
      },
      {
        path: 'orders',
        loadChildren: () =>
          import('./order-history/order-history.module').then(
            (module) => module.OrderHistoryModule
          ),
      },
      {
        path: 'portfolio',
        loadChildren: () =>
          import('./portfolio/portfolio.module').then(
            (module) => module.PortfolioModule
          ),
      },
      {
        path: 'portfolio/:id',
        loadChildren: () =>
          import('./portfolio/portfolio.module').then(
            (module) => module.PortfolioModule
          ),
      },
      {
        path: 'reporting',
        loadChildren: () =>
          import('./reporting/reporting.module').then(
            (module) => module.ReportingModule
          ),
      },
      {
        path: 'account',
        loadChildren: () =>
          import('./account/account.module').then(
            (module) => module.AccountModule
          ),
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewsRoutingModule { }
