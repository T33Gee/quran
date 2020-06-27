import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EffortService } from 'src/app/services/backend/effort.service';
import { SessionService } from 'src/app/services/session.service';
import { Effort, EffortTypeEnum, Part, Chapter } from 'src/app/models/api-models/effort.model';

@Component({
  selector: 'app-efforts',
  templateUrl: './efforts.component.html',
  styleUrls: ['./efforts.component.scss']
})
export class EffortsComponent implements OnInit {

  routeSubscription: Subscription; 
  groupId:  number;
  efforts: Effort[];
  parts: Part[];
  chapters: Chapter[];
  EffortTypeEnum = EffortTypeEnum;

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private api: EffortService,
    private session: SessionService
    ) { }

  async ngOnInit() {
    this.route.params.subscribe(r => this.groupId = +r["groupId"]).unsubscribe();
    if(!this.groupId) this.router.navigate(['home']); // TODO maybe use route guard for this
    this.efforts = await this.api.getUserEfforts(this.session.getUser().userId, this.groupId);
  }



}
