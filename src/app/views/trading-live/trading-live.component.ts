import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
// import { AuthenticationService } from 'src/app/services/authentication.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-trading-live',
  templateUrl: './trading-live.component.html',
  styleUrls: ['./trading-live.component.css']
})
export class TradingLiveComponent implements OnInit {

  buyForm: FormGroup;
  isLoading =false;
  market_data: any;
  products:any;
  isSaving = false;
  userID = localStorage.getItem('userID');
  
  product ={
    id: '',
    ticker: '',
    lastTradedPrice: '',
    maxPriceShift: '',
    askPrice: '',
    bidPrice: '',
    buyLimit: '',
  }

  constructor(
    private formBuilder: FormBuilder,
    private utils: UtilsService,
    private auth: AuthenticationService, 
    private alert: AlertService,
    
  ) {
    this.buyForm = this.initBuy();
   }

  ngOnInit(): void {
    this.getMarketData();
    
  }

  initBuy(): FormGroup{
    return this.formBuilder.group({
      amount: new FormControl(null, Validators.required),
      quantity: new FormControl(null, Validators.required),
    })
  }

  /** Get a specific product based on id */
  getProduct(ticker:any){
    this.auth.get('marketservice/products/'+ticker).subscribe({
      next: ((response:any) => {
        console.log(response);
        this.products = response;
        this.product  = this.products.reduce((prev:any, current:any) => (prev.bidPrice < current.bidPrice) ? prev : current)
      }
      ),
      error:
      ((error: any)=>{
        console.log(error)
      })
    })
   
  }

  /** Buy a specific product */
  buyProduct(ticker:any){
    const formData = this.buyForm.getRawValue();
    const data = {
      user_id : Number(this.userID),
      quantity: formData.quantity,
      price: formData.amount,
      product: ticker
    }
    this.isSaving = true;
    this.auth.store('orderservice/orders', data).subscribe({
      next: (response:any)=>{
        console.log(response);
        this.isSaving = false;
      },
      error: (error)=>{
        this.isSaving = false;
        this.alert.error(error.error);
      }
    })

  } 

  /** Get market Data */
  getMarketData(){
    this.isLoading = true;
    this.auth.get('marketservice/products/buy').subscribe({
      next: ((response:any) => {
        console.log(response);
        this.market_data = response;
        this.isLoading = false;
      }
      ),
      error:
      ((error: any)=>{
        console.log(error)
        this.isLoading = false;
        this.alert.error(error.message)
      })
    })
  }
  
}
