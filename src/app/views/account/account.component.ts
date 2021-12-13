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
  transactiontype = '';
  balance = 0;

  accountDetails = {
    account_id : '',
    account_balance : null
  }

  transactions: any = [];


  constructor(
    private utils: UtilsService,
    private formBuilder: FormBuilder,
    private alert: AlertService,
    private auth:  AuthenticationService,
  ) {
    this.addFundsForm = this.initAddfunds();
  }

  ngOnInit(): void {
    this.getAccountDetails();
  }

  initAddfunds():FormGroup{
    return this.formBuilder.group({
      amount: new FormControl(null, Validators.required),
      modeOfPayment: new FormControl(null, Validators.required),
    })
  }

  /** Transaction types */
  add(){
    this.transactiontype = 'add'
  }

  withdraw(){
    this.transactiontype = 'withdraw'
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
    this.auth.store('accountservice/account/'+ this.accountDetails.account_id + '/addFunds' , data).subscribe({
      next: (response:any)=>{
        console.log(response);
        this.isSaving = false;
        this.alert.success("Funds added successfully");
        this.addFundsForm.reset();
        this.utils.closeModal('addFunds', 'add-funds');
        this.getAccountDetails();
        this.getTransactions(this.accountDetails.account_id);
      },
      error: (error)=>{
        this.isSaving = false;
        console.log(error);
        this.alert.error(error.message);
      }
    })

    
  }

  /** Withdraw Funds */
  withdrawFund(){
    console.log(this.addFundsForm.getRawValue())
    const formData = this.addFundsForm.getRawValue();
    const data = {
      amount: formData.amount,
      modeOfPayment: formData.modeOfPayment
    }

    this.isSaving = true;
    this.auth.store('accountservice/account/'+ this.accountDetails.account_id + '/withdraw' , data).subscribe({
      next: (response:any)=>{
        console.log(response);
        this.isSaving = false;
        this.alert.success("Funds withdrawn successfully");
        this.addFundsForm.reset();
        this.utils.closeModal('addFunds', 'add-funds');
        this.getAccountDetails();
        this.getTransactions(this.accountDetails.account_id);
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
    this.auth.get('accountservice/account/clientId/' + this.userID).subscribe({
      next: (response:any) =>{
        console.log(response);
        this.accountDetails.account_id = response.accountId;
        this.accountDetails.account_balance = response.totalBalance;
        this.balance = response.totalBalance;
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
    this.auth.get('accountservice/transactions/'+id).subscribe({
      next: (response)=>{
        console.log(response);
        this.transactions = response;
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


