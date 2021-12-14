import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PortfolioCategoryRoutingModule } from './porfolio-category-routing.module';
import { PortfolioCategoryComponent } from './porfolio-category.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PortfolioCategoryComponent
  ],
  imports: [
    CommonModule,
    PortfolioCategoryRoutingModule,
    ReactiveFormsModule,
  ]
})
export class PortfolioCategoryModule { }
