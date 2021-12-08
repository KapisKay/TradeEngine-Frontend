import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  signInForm : FormGroup;
  isSaving = false;


  constructor(
    private formBuilder: FormBuilder,
    private auth : AuthenticationService,
    private router: Router,
    private alert: AlertService,
  ) {
    this.signInForm = this.initSignInForm();
   }

  ngOnInit(): void {
    
  }

  initSignInForm(): FormGroup{
    return this.formBuilder.group({
      email : new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    })
  }

 onSubmit(){
  /** Return if user credentials are invalid */
   if (this.signInForm.invalid){
     return
   }

  /**  Login, stored data in local storage and redirect to dashboard */
  const data  = this.signInForm.getRawValue;
  this.isSaving = true;
  this.auth.login('signIn', data).subscribe({
    next: (response:any): void=>{
      localStorage.setItem('token', response.token);
      this.getUserDetails();
      const role = localStorage.getItem('role');
      this.isSaving = false
      if(role == 'client'){
        this.router.navigateByUrl('/dashboard');
      }
      else if( role == 'regulator'){
        this.router.navigateByUrl('/regulator/dashboard');
      }
      else{
        this.router.navigateByUrl('/admin/dashboard');
      }
     
      this.alert.success(`Welcome ${localStorage.getItem('user')}` )
    },
    error: error=>{
      this.isSaving = false;
     if (error.status == 401) {
       this.alert.info(error['error']['message']);
     } else if (error.status == 404) {
       this.alert.error(error['error']);
     } else if (error.status == 500) {
       this.alert.error('Could not login at the moment');
     } else {
       this.alert.error('An unknown error occurred, please try again later');
     }
    }
  } 
   )
 }

  /** Get user details from access token*/
  getUserDetails(){
    this.auth.get('user').subscribe({
      next: (response:any)=>{
        console.log(response);
        localStorage.setItem('userID', response.id);
        localStorage.setItem('user', response.fullName);
        localStorage.setItem('role', response.userRole)
      },
      error: (error)=>{
        console.log(error);
      }
    })
  }
}
