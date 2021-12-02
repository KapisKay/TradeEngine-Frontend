import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './views/authentication/sign-in/sign-in.component';



const routes: Routes = [
    {
        path: '',
        children: [
        {
            path: '',
            loadChildren: () =>
            import('./views/views.module').then((module) => module.ViewsModule),
        },
        
        ],
    },
    {
        path: '',
        children: [
        {
            path: '',
            loadChildren: () =>
            import('./regulator-views/regulator-views.module').then((module) => module.RegulatorViewsModule),
        },
        
        ],
    },
    { path: '', component: SignInComponent},
    { path: '**', redirectTo: '/authentication/sign-in', pathMatch: 'full' },
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
  })
  export class AppRoutingModule {}
  