import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RunTaskService } from 'src/app/services/run-task.service';
import { AdminService } from 'src/app/services/backend/admin.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {
  loginForm: FormGroup;
  isValidatingLogin = false;
  get username(): string { return this.loginForm?.get('username').value;}
  get password(): string { return this.loginForm?.get('password').value;}
  constructor(private api: AdminService,
              private fb:FormBuilder, 
              private router: Router,
              private runTaskService: RunTaskService
              ) { }
  
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [Validators.required]),
    });
    
  }

  async login() {
    this.isValidatingLogin = true;
    await this.runTaskService.runTask('validating login', async () => {
      var login = await this.api.validateLogin(this.username, this.password)
      if(login.success) {
        // set menu items
        this.isValidatingLogin = false; 
        this.router.navigate(['admin-home']);
      }
      else {
        throw new Error();
      }
    }, true, () => { return {errorText: "cannot log you in"}});
    this.isValidatingLogin = false; 
  }
}
