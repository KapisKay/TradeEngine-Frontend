import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
// import { AuthenticationService } from 'src/app/services/authentication.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-trading-live',
  templateUrl: './trading-live.component.html',
  styleUrls: ['./trading-live.component.css']
})
export class TradingLiveComponent implements OnInit {

  buyForm: FormGroup;
  
  product ={
    id: '',
    ticker: '',
    last_traded_price: '',
    max_price_shift: '',
    ask_price: '',
    bid_price: '',
    buy_limit: '',
  }

  constructor(
    private formBuilder: FormBuilder,
    private utils: UtilsService,
    // private auth: AuthenticationService
  ) {
    this.buyForm = this.initBuy();
   }

  ngOnInit(): void {
    
  }

  initBuy(): FormGroup{
    return this.formBuilder.group({
      amount: new FormControl(null, Validators.required),
      reference: new FormControl(null, Validators.required),
    })
  }

  /** Get a specific product based on id */
  getProduct(id:any){
    // this.auth.get('').subscribe({
    //   next: ((response:any) => {
    //     console.log('');
    //   }
    //   ),
    //   error:
    //   ((error: any)=>{
    //     console.log(error)
    //   })
    // })
   
  }

  /** Buy a specific product */
  buyProduct(id:any){
    
  }
}
