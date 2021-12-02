import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UtilsService } from 'src/app/services/utils.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

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
    private utils: UtilsService,
    private formBuilder: FormBuilder,
  ) { 
    this.buyForm = this.initBuy();
  }
  buyForm: FormGroup;


  ngOnInit(): void {
  }

  initBuy(): FormGroup{
    return this.formBuilder.group({
      amount: new FormControl(null, Validators.required),
      reference: new FormControl(null, Validators.required),
    })
  }
 
  addFund(){
    console.log(this.buyForm.getRawValue())
    this.utils.closeModal('addFunds', 'add-funds');
  }

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

  cancelOrder(id: any){

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

  /**Update a specific order */
  updateOrder(id:any){}

}
