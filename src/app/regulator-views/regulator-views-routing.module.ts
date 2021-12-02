import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegulatorViewsComponent } from './regulator-views.component';

const routes: Routes = [
  {
    path: 'authentication',
    loadChildren: () =>
      import('./../views/authentication/authentication.module').then(
        (module) => module.AuthenticationModule
      ),
  },
  {
    path: '',
    component: RegulatorViewsComponent,
    // canActivate: [AuthGuard, RegulatorGuard],
    children: [
      {
        path: 'regulator/dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then(
            (module) => module.DashboardModule
          ),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegulatorViewsRoutingModule { }
