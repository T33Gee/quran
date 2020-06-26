import { Component, OnInit, ViewChild } from '@angular/core';
import { SpinnerService } from 'src/app/services/spinner.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { TransportService } from 'src/app/services/backend/transport.service';
import { LoginService } from 'src/app/services/backend/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  hideSignup = true;
  messages = {
    successSignupMessage: false,
    errorSignupMessage: false,
    errorSigninMessage: false
  }
  signupForm: FormGroup;
  signinForm: FormGroup;

  constructor(private api: LoginService,
              private fb:FormBuilder, 
              private spinner: SpinnerService,
              private router: Router
              ) { }
  
  ngOnInit(): void {
    this.signupForm = this.fb.group({
      signupUsername: [null, Validators.required],
      signupEmail: [null, Validators.required],
      signupPassword: [null, Validators.required],

    });

    this.signinForm = this.fb.group({
      signinEmail: [null, Validators.required],
      signinPassword: [null, Validators.required]
    });
    
    this.spinner.displaySpinner(true);
    setTimeout(() => { this.spinner.displaySpinner(false); }, 1000);
  }

  resetMessages() {
    this.messages = {
      successSignupMessage: false,
      errorSignupMessage: false,
      errorSigninMessage: false
    }
  }

  async signIn() {
    const success = await (await this.api.signIn("user1","pass1")).success;
    success ? this.router.navigate(['home']) : this.messages.errorSigninMessage = true;
  }

  async signUp() {
    const success = await (await this.api.signUp({userId:1,username:"user 1",password:"123",email:"e@mail.com"})).success;
    if(success) {
      this.resetMessages()
      this.messages.successSignupMessage = true;
      this.hideSignup = true;
    }
    else {
      this.resetMessages()
      this.messages.errorSignupMessage = true;
    }
  }

  toggleShowSignUp(val) {
    this.hideSignup = val
    this.resetMessages();
  }
}
