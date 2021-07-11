import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { LoginService } from 'src/app/services/backend/login.service';
import { Router } from '@angular/router';
import { Observable, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { RunTaskService } from 'src/app/services/run-task.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  INVITE_CODE_LENGTH = 8;
  acceptInviteForm: FormGroup;
  isValidatingCode = false;
  get inviteCodeControl(): AbstractControl {
    return this.acceptInviteForm?.get('inviteCode');
  }

  get inviteCodeValidator(): AsyncValidatorFn {
      let result = null;
      return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
        this.isValidatingCode = !this.inviteCodeControl || this.inviteCodeControl.value.length !== 0 
        return timer(500).pipe(
          switchMap(async () => {
          await this.runTaskService.runTask('validating invite code', async () => {
            var valid = await this.api.validateInviteCode(control.value);            
            if(valid) {
              // set the users name field if the name is set in localStorage
              this.inviteCodeControl.disable();
            }
            else {
              result = {valid: 'Please provide correct code'};
            } 
          });
          this.isValidatingCode = false; 
          console.log(this.isValidatingCode)
          return result;
        }));
    }
  }


  constructor(private api: LoginService,
              private fb:FormBuilder, 
              private router: Router,
              private runTaskService: RunTaskService
              ) { }
  
  ngOnInit(): void {
    this.acceptInviteForm = this.fb.group({
      name: this.fb.control('', [Validators.required, Validators.maxLength(20), /*Validators.pattern()*/]),
      inviteCode: this.fb.control('', [Validators.maxLength(this.INVITE_CODE_LENGTH), Validators.minLength(this.INVITE_CODE_LENGTH)], [this.inviteCodeValidator]),
      // emailAddress: this.fb.control('')
    });
    
  }

  enterRoom() {
    // store local storage as follows
    // roomCode
    // enteredRooms[] // To determine if we have already been in this room we can use the same name
    // name
    this.router.navigate(['recital']);
  }

}

