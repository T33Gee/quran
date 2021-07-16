import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { RunTaskService } from 'src/app/services/run-task.service';
import { AdminService } from 'src/app/services/backend/admin.service';
import { RecitalType } from 'src/app/models/api-models';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {
  RecitalType = RecitalType;
  createRecitalForm: FormGroup;
  isCreatingRecital = false;
  inviteCode: string;
  get recitalType(): RecitalType { return this.createRecitalForm?.get('recitalType').value;}
  get recitalName(): string {return this.createRecitalForm?.get('recitalName').value; }
  get recitalNumberOfTimes(): number {return this.createRecitalForm?.get('recitalNumberOfTimes')?.value || 0; }
  get numberOfTimesValidators(): ValidatorFn[] {
    return [Validators.required, Validators.min(1), Validators.max(1000)];
  }

  constructor(private api: AdminService,
              private fb:FormBuilder, 
              private router: Router,
              private runTaskService: RunTaskService
              ) { }
  
  ngOnInit(): void {
    this.createRecitalForm = this.fb.group({
      recitalName: this.fb.control('', [Validators.required, Validators.maxLength(50)]),
      recitalType: this.fb.control(RecitalType.Khattam, [Validators.required]),
    });
    this.createRecitalForm.get('recitalType').valueChanges.subscribe(val => {
      if(val === RecitalType.Surah) {
        this.createRecitalForm.addControl('recitalNumberOfTimes', this.fb.control(null, this.numberOfTimesValidators))
      }
      else if(val !== RecitalType.Surah) this.createRecitalForm.removeControl('recitalNumberOfTimes');       
    })
  }

  async createRecital() {
    this.isCreatingRecital = true;
    console.log(this.recitalNumberOfTimes);
    await this.runTaskService.runTask('creating recital', async() => {
      this.inviteCode = (await this.api.addNewRecital(this.recitalName, this.recitalType, this.recitalNumberOfTimes)).inviteCode;
    });
    setTimeout(() => {      
      this.isCreatingRecital = false; 
    }, 1000);
  }
}
