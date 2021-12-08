import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { UtilsService } from 'src/app/services/utils.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  addFundsForm: FormGroup;
  isLoading = false; 
  isSaving = false;
  userID = localStorage.getItem('userID');

  accountDetails = {
    account_id : '',
    account_balance : ''
  }

  transactions = [];


  constructor(
    private utils: UtilsService,
    private formBuilder: FormBuilder,
    private alert: AlertService,
    private auth:  AuthenticationService,
  ) {
    this.addFundsForm = this.initAddfunds();
  }

  ngOnInit(): void {

  }

  initAddfunds():FormGroup{
    return this.formBuilder.group({
      amount: new FormControl(null, Validators.required),
      modeOfPayment: new FormControl(null, Validators.required),
    })
  }

  /** Add Funds */
  addFund(){
    console.log(this.addFundsForm.getRawValue())
    const formData = this.addFundsForm.getRawValue();
    const data = {
      amount: formData.amount,
      modeOfPayment: formData.modeOfPayment
    }

    this.isSaving = true;
    this.auth.store('account/'+ this.accountDetails.account_id + '/addFunds' , data).subscribe({
      next: (response:any)=>{
        console.log(response);
        this.isSaving = false;
        this.alert.success(response.message);
        this.addFundsForm.reset();
        this.utils.closeModal('addFunds', 'add-funds');
      },
      error: (error)=>{
        this.isSaving = false;
        console.log(error);
        this.alert.error(error.message);
      }
    })

    
  }

  /** Get Account Details */
  getAccountDetails(){
    this.isLoading = true;
    this.auth.get('account/accountId/' + this.userID).subscribe({
      next: (response:any) =>{
        console.log(response);
        this.accountDetails.account_id = response.accountID;
        this.accountDetails.account_balance = response.totlBalance;
        this.getTransactions(this.accountDetails.account_id);
        this.isLoading = false;
      },
      error: (error)=>{
        this.isLoading = false;
        console.log(error);
        this.alert.error(error.message);
      }
    })

  }

  /** Get Account Transactions */

  getTransactions(id:any){
    this.isLoading = true;
    this.auth.get('transactions/'+id).subscribe({
      next: (response)=>{
        console.log(response);
        response = this.transactions;
        this.isLoading = false;
      },
      error: (error)=>{
        console.log(error);
        this.isLoading = false;
        this.alert.error(error.message);
      }
    })
  }

}
