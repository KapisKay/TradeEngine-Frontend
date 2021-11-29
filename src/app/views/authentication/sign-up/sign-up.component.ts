import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,  Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ValidationServiceService } from 'src/app/services/validation-service.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signUpForm : FormGroup;
  password = null;
  constructor(
    private formBuilder: FormBuilder,
    private validationService: ValidationServiceService,
    // private auth: AuthenticationService,
    // private alert: AlertService,
    private router: Router,
  ) { 
    this.signUpForm = this.initSignUpForm();
  }

  ngOnInit(): void {

  }

  /** Initialise form Variables */
  initSignUpForm():FormGroup{
    return this.formBuilder.group({
      name: new FormControl(null ,Validators.required),
      email: new FormControl(null, Validators.required),
      password: new FormControl(null,Validators.compose([Validators.required, Validators.minLength(8)])),
      confirm_password: new FormControl(null)
    },
    {
      validator: this.validationService.MatchPassword('password', 'confirm_password'),
    }
    )
  }

  /** Register  */
    register(){
      /** Return if user credentials are invalid */
    if (this.signUpForm.invalid){
      return
    }

    const formData =this.signUpForm.getRawValue();

    const data = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    }

    // this.auth.createUser('url', data).subscribe(
    //   (response:any)=>{
    //     this.alert.success('Account created successfully. Please Login');
    //     this.router.navigateByUrl('/authentication/sign-in');
    //   },
    //   error=>{
    //     console.log(error);
    //   }
    // )
  }
}
