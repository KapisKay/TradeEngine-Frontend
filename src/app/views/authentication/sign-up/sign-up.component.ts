import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,  Validators } from '@angular/forms';
import { ActivatedRoute,  Event, NavigationEnd, Router, RouterEvent  } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ValidationServiceService } from 'src/app/services/validation-service.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signUpForm : FormGroup;
  password = null;
  paramRoute: string = '';
  role: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private validationService: ValidationServiceService,
    private auth: AuthenticationService,
    private alert: AlertService,
    private router: Router,
  ) { 
    this.signUpForm = this.initSignUpForm();

    this.getQueryParam();

  }

  ngOnInit(): void {

  }

  getQueryParam(){
    this.router.events.pipe(
      filter((e: Event): e is RouterEvent => e instanceof NavigationEnd)
    ).subscribe((e: RouterEvent) => {
      this.paramRoute= e.url;
      if(this.paramRoute.includes('regulator')){
        this.role ='regulator';
      }
      else if(this.paramRoute.includes('admin')){
        this.role = 'admin';
      }
      else{
        this.role = 'client';
      }
   });
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
      fullName: formData.name,
      email: formData.email,
      password: formData.password,
    }
    console.log(data)

    this.auth.createUser(`signUp?role=${this.role}` , data).subscribe({
      next: (response:any)=>{
        console.log(response);
        this.alert.success('Account created successfully. Please Login');
        this.router.navigateByUrl('/authentication/sign-in');
      },
      error: error=>{
        console.log(error);
        this.alert.error(error.error)
      }
    }
    )
  }
}
