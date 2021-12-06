import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication.component';

const routes: Routes = [
  {
    path: '',
    // component: AuthenticationComponent,
    children: [
      {
        path: 'sign-up',
        loadChildren: () =>
          import('./sign-up/sign-up.module').then((module) => module.SignUpModule),
      },
      {
        path: 'sign-in',
        loadChildren: () =>
          import('./sign-in/sign-in.module').then((module) => module.SignInModule),
      },
      {
        path: 'sign-in/regulator',
        loadChildren: () =>
          import('./sign-in/sign-in.module').then((module) => module.SignInModule),
      },
      {
        path: 'sign-in/admin',
        loadChildren: () =>
          import('./sign-in/sign-in.module').then((module) => module.SignInModule),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
