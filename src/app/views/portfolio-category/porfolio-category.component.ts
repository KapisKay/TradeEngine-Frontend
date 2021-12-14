import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-porfolio-category',
  templateUrl: './porfolio-category.component.html',
  styleUrls: ['./porfolio-category.component.css']
})
export class PortfolioCategoryComponent implements OnInit {
  isLoading = false;
  isSaving = false;
  porfolioForm : FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) { 
    this.porfolioForm = this.initPortfolio();
  }

  ngOnInit(): void {
  }

  initPortfolio(): FormGroup{
    return this.formBuilder.group({
      
    })
  }

}
