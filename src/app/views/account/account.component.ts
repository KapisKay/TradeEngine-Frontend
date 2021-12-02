import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  addFundsForm: FormGroup;

  constructor(
    private utils: UtilsService,
    private formBuilder: FormBuilder,
    private alert: AlertService,
  ) {
    this.addFundsForm = this.initAddfunds();
  }

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
