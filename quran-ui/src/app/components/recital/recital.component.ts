import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';
import { PledgeStatus, RecitalDetails, RecitalItemStatusChangeRequest } from 'src/app/models/api-models';
import { RecitalService } from 'src/app/services/backend/recital.service';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { RecitalStat } from 'src/app/models/view-modes';
import { RunTaskService } from 'src/app/services/run-task.service';

@Component({
  selector: 'app-recital',
  templateUrl: './recital.component.html',
  styleUrls: ['./recital.component.scss']
})
export class RecitalComponent implements OnInit {
  
  isLoading = true;
  ColumnMode = ColumnMode;
  PledgeStatus = PledgeStatus;
  recitalDetails: RecitalDetails;
  recitalStats: Map<string, string>;
  recitalStatRows: RecitalStat[];

  get username(): string {
    return this.sessionService.getReciterUsername();
  }

  get inviteCode(): string {
    return this.sessionService.getReciterDetails().inviteCode;
  }

  getRecitalStatRows(): RecitalStat[] {
    let tot = 0;
    let stats: RecitalStat[] = [];
    for(var k of this.recitalStats.keys()) {
      const percent = this.recitalStats.get(k)
      stats.push({name:k, percentage: percent})
      tot += +percent.split('%')[0]
    }
    // sort the stats
    // console.log(stats)
    const inProgress = this.recitalDetails.recitalItems.filter(i => i.status === PledgeStatus.Pledged).length;
    const totalItems = this.recitalDetails.recitalItems.length;
    const inProgressPercent = ((inProgress/totalItems)*100);
    stats.push({name:'In Progress', percentage: inProgressPercent.toFixed(0) + ' %'})    
    stats.push({name:'Left To Complete', percentage: (100-(tot+inProgressPercent)).toFixed(0)+' %'})
    return stats;  
  }

  constructor(private recitalService: RecitalService,
     private runTaskService: RunTaskService ,
      private sessionService: SessionService) { }


  async ngOnInit() {
    this.isLoading = true;    
    await this.runTaskService.runTask('fetching details', 
      async () => {        
        this.recitalDetails = await this.recitalService.getRecitalDetails(this.inviteCode);
      }).finally(() => this.isLoading = false);
    this.calculateStats();    
  }

  getRowClass(row) {
    return {
      'is-complete': row.status === 'Complete',
      'is-pending': row.status === 'Pledged',
      'is-open': row.status === 'NotStarted',
      'stats-table': !!row.percentage,
    };
  }

  isMyRecital(userName: string) {
    return userName === this.username;
  }

  async pledge(itemName: string) {
    this.isLoading = true;
      await this.runTaskService.runTask(`pledging to recite ${itemName}`, async() => {
        await this.recitalService.pledgeToRecite({
          inviteCode: this.inviteCode,
          itemName: itemName,
          username: this.username
        });
        await this.changeRecitalStatus(PledgeStatus.Pledged, itemName);
      }).finally(() => this.isLoading = false);
  }

  async complete(itemName: string){
    this.isLoading = true;
      await this.runTaskService.runTask(`completing ${itemName}`, async() => {
        await this.recitalService.markRecitalItemAsComplete({
          inviteCode: this.inviteCode,
          itemName: itemName,
          username: this.username
        });
        await this.changeRecitalStatus(PledgeStatus.Complete, itemName);
      }).finally(() => this.isLoading = false);;
  }

  private changeRecitalStatus(status: PledgeStatus, itemName: string) {
    this.isLoading = true; 
    const item = this.recitalDetails.recitalItems.find(x => x.itemName === itemName);
    item.usersName = this.username;
    item.status = status;
    this.recitalDetails.recitalItems = [...this.recitalDetails.recitalItems];
    this.isLoading = false;
    this.calculateStats();    
  }

  private calculateStats() {
    this.recitalStats = new Map();
    const usersParticipated = this.recitalDetails.recitalItems.filter(r => r.status === PledgeStatus.Complete).map(r => r.usersName);
    new Set(usersParticipated).forEach(user => {
      const usersParticipation = usersParticipated.filter(i => i === user).length;
      const totalItems = this.recitalDetails.recitalItems.length;
      const percentage = (usersParticipation/totalItems * 100).toFixed(0).toString() + ' %';
      this.recitalStats.set(user, percentage)  
    });
    this.recitalStatRows = [...this.getRecitalStatRows()];
  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }
}
