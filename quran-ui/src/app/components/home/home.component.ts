import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/backend/user.service';
import { Group } from 'src/app/models/api-models/groups.model';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  groups: Group[];
  constructor(private api: UserService, private session: SessionService) { }

  async ngOnInit() {
    this.groups = await this.api.getUsersGroups(this.session.getUser().userId);
    console.log(this.groups);
  }

}
