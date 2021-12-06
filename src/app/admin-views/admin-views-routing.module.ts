import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminViewsComponent } from './admin-views.component';

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
    component: AdminViewsComponent,
    // canActivate: [AuthGuard, AdminGuard],
    children: [
      {
        path: 'admin/dashboard',
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
export class AdminViewsRoutingModule { }
