import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RunTaskService } from 'src/app/services/run-task.service';
import { AdminService } from 'src/app/services/backend/admin.service';
import { Recital, RecitalDetails } from 'src/app/models/api-models';
import { ColumnMode } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.scss']
})
export class AdminListComponent implements OnInit {
  isLoading = false;
  recitalList: Recital[];
  ColumnMode = ColumnMode;
  filteredRows:Recital[];
  searchText = "";
  constructor(private api: AdminService,
              private fb:FormBuilder, 
              private router: Router,
              private runTaskService: RunTaskService
              ) { }
  
  async ngOnInit(): Promise<void> {
    this.isLoading = true;
    await this.runTaskService.runTask('getting list of recitals', async () => {
      this.recitalList = await this.api.getRecitals('1');
      this.filteredRows = this.recitalList;
    });
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  performSearch() {
    this.filteredRows = this.recitalList.filter(s => this.matchRecital(s));
  }

  private matchRecital( recital: Recital): boolean{
    const expression = new RegExp(this.searchText.toLowerCase(),"g");
    return recital.inviteCode.toLowerCase().search(expression) >= 0 ||
    recital.recitalName.toLowerCase().search(expression) >= 0 ||
    recital.recitalStatus.toLowerCase().search(expression) >= 0 ||
    recital.recitalType.toLowerCase().search(expression) >= 0 ||
    recital.startedDate.toLowerCase().search(expression) >= 0
  }

}
