import { HttpHeaders } from '@angular/common/http';
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
  role: any;

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
  const data = this.signInForm.getRawValue();
  // const data = {
  //   email: formData.email,
  // }
  this.isSaving = true;
  this.auth.login('authservice/signIn', data).subscribe({ 
    next: (response:any): void=>{
      localStorage.setItem('token', response.token);
      this.getUserDetails();
      // const role = localStorage.getItem('role');
      this.isSaving = false;
     
    },
    error: error=>{
      this.isSaving = false;
     if (error.status == 401) {
       this.alert.info(error['error']['message']);
     } else if (error.status == 404) {
       this.alert.error(error['error']);
     } else if (error.status == 500) {
       this.alert.error(error.error.message);
     } else {
       this.alert.error('An unknown error occurred, please try again later');
     }
    }
  } 
   )
 }

  /** Get user details from access token*/
  getUserDetails(){
    this.auth.get('authservice/user').subscribe({
      next: (response:any)=>{
        console.log(response);
        localStorage.setItem('userID', response.id);
        localStorage.setItem('user', response.fullName);
        localStorage.setItem('role', response.userRole)
        this.role = response.userRole;
        if(this.role == 'CLIENT'){
          this.router.navigateByUrl('/dashboard');
        }
        else if( this.role == 'Regulator'){
          this.router.navigateByUrl('/regulator/dashboard');
        }
        else{
          this.router.navigateByUrl('/admin/dashboard');
        }
       
        this.alert.success(`Welcome ${localStorage.getItem('user')}` )
      },
      error: (error)=>{
        console.log(error);
      }
    })
  }
}
