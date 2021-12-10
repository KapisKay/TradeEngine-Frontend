import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UtilsService } from 'src/app/services/utils.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  buyForm: FormGroup;
  searchForm: FormGroup;

  order ={
    id: '',
    ticker: '',
    last_traded_price: '',
    max_price_shift: '',
    ask_price: '',
    bid_price: '',
    buy_limit: '',
  }
  isLoading = false;
  isSaving = false;

  accountDetails = {
    account_id : '',
    account_balance : ''
  }
  userID = localStorage.getItem('userID');
  orders: any;

  constructor(
    private utils: UtilsService,
    private formBuilder: FormBuilder,
    private auth: AuthenticationService,
    private alert: AlertService,
  ) { 
    this.buyForm = this.initBuy();
    this.searchForm = this.initSearchForm();
  }



  ngOnInit(): void {
    this.getAccountDetails();
  }

  initBuy(): FormGroup{
    return this.formBuilder.group({
      amount: new FormControl(null, Validators.required),
      quantity: new FormControl(null, Validators.required),
    })
  }

  initSearchForm(): FormGroup{
    return this.formBuilder.group({
      side: new FormControl(null),
      status: new FormControl(null),
    })
  }

  /** Search */
  search(){
    const formData = this.searchForm.getRawValue();
  }
 
  /** Get Account Details */
  getAccountDetails(){
    this.isLoading = true;
    this.auth.get('account/accountId/' + this.userID).subscribe({
      next: (response:any) =>{
        console.log(response);
        this.accountDetails.account_id = response.accountID;
        this.accountDetails.account_balance = response.totlBalance;
        this.getOrders();
        this.isLoading = false;
      },
      error: (error)=>{
        this.isLoading = false;
        console.log(error);
        this.alert.error(error.message);
      }
    })

  }

  /** Get Order List */
  getOrders(){
    this.isLoading = true;
    this.auth.get('').subscribe({
      next: (response:any)=>{
        console.log(response);
        this.orders = response;
        this.isLoading = false;
      },
      error: (error)=>{
        this.isLoading = false;
        console.log(error);
        this.alert.error(error.message);
      }
    })
  }


/** Confirm Cancel Order */
  confirmCancel(id: any, ticker: any, side: any){
    Swal.fire({
      title: `Cancel ${ticker}  ${side}?`,
      text: `Are you sure you want to cancel this product order?.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value) {
        this.cancelOrder(id);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  }

  /** Cancel Order */
  cancelOrder(id: any){
    this.auth.delete('',id).subscribe({
      next: (response:any)=>{
        console.log(response);
        this.alert.success(response.messsage);
        this.getOrders();
      },
      error: (error)=>{
        console.log(error);
        this.alert.error(error.message);
      }
    })
  }

  /** Get a specific product based on id */
  getOrder(id:any){
    this.auth.get('').subscribe({
      next: ((response:any) => {
        console.log(response);
        this.order = response;
      }
      ),
      error:
      ((error: any)=>{
        console.log(error)
      })
    })
  }

  /** Edit Order */
  editOrder(){
    this.buyForm.setValue({
      amount : this.order.ask_price,
      quantity: this.order.ticker,
    })
  }

  /**Update a specific order */
  updateOrder(id:any){}

}
