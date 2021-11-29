import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



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
    { path: '**', redirectTo: '/authentication/sign-in', pathMatch: 'full' },
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
  })
  export class AppRoutingModule {}
  