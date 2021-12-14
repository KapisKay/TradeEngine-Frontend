import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortfolioCategoryComponent } from './porfolio-category.component';

const routes: Routes = [
  {
    path: '',
    component: PortfolioCategoryComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortfolioCategoryRoutingModule { }
