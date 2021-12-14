import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  products: any = [];
  isLoading = false;
  sellForm: FormGroup;

  product ={
    id: '',
    ticker: '',
    lastTradedPrice: '',
    maxPriceShift: '',
    askPrice: '',
    bidPrice: '',
    sellLimit: '',
  }

  isSaving = false;
  userID = localStorage.getItem('userID');

  constructor(
    private auth: AuthenticationService,
    private alert: AlertService,
    private formBuilder: FormBuilder
  ) { 
    this.sellForm = this.initSell();
  }

  ngOnInit(): void {
  }

  initSell(): FormGroup{
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

  /** Sell a specific product */
  sellProduct(ticker:any){
    const formData = this.sellForm.getRawValue();
    const data = {
      user_id : Number(this.userID),
      quantity: formData.quantity,
      price: formData.amount,
      product: ticker,
      side: 'BUY'
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

}
