import { Component, OnInit, ViewChild } from '@angular/core';
import { SpinnerService } from 'src/app/services/spinner.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/backend/api-service-base';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  hideSignup = true;
  signupForm: FormGroup;
  signinForm: FormGroup;

  constructor(private api: ApiService, private fb:FormBuilder, private spinner: SpinnerService) { }
  
  ngOnInit(): void {
    this.signupForm = this.fb.group({
      signupUsername: ['', Validators.required],
      signupEmail: ['', Validators.required],
      signupPassword: ['', Validators.required],

    }) 
    this.signinForm = this.fb.group({
      signinEmail: ['', Validators.required],
      signinPassword: ['', Validators.required]
    });
    
    this.spinner.displaySpinner(true);
    setTimeout(() => { this.spinner.displaySpinner(false); }, 1000);
  }

  async signIn() {
    const res = await this.api.get("Login/attemptLogin")
    console.log(res)
  }

  signUp() {
    console.log("signup")
  }
  toggleShowSignUp(val) {
    console.log(val);
    this.hideSignup = val
  }
}
