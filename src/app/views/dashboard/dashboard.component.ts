import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private utils: UtilsService,
    private formBuilder: FormBuilder,
  ) { 
    this.addFundsForm = this.initAddfunds();
  }
  addFundsForm: FormGroup;


  ngOnInit(): void {
  }

  initAddfunds():FormGroup{
    return this.formBuilder.group({
      amount: new FormControl(null, Validators.required),
      reference: new FormControl(null, Validators.required),
    })
  }
 
  addFund(){
    console.log(this.addFundsForm.getRawValue())
    this.utils.closeModal('addFunds', 'add-funds');
  }

}
