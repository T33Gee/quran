import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NavItemEnum } from 'src/app/models/view-modes';
import { NavbarAccessService } from 'src/app/services/backend/navbar.service';
import { RunTaskService } from 'src/app/services/run-task.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  hasAccess = false;
  NavItemEnum = NavItemEnum;
  items: NavItemEnum[];
  constructor(private router: Router, private runTaskService: RunTaskService, private navbarService: NavbarAccessService, private sessionService: SessionService) { }

  async ngOnInit(): Promise<void> {
    this.router.events.subscribe(async (ev) => {
      if (ev instanceof NavigationEnd) { await this.getAccessRights(); }
    });
    
  }

  exitRoom(link: NavItemEnum) {
    this.sessionService.clearToken();
    this.navigateTo(link);
  }

  logout(link: NavItemEnum){
    this.sessionService.clearAdminToken();
    this.navigateTo(link);
  }

  async navigateTo(link: NavItemEnum) {
    await this.getAccessRights();
    this.router.navigate([link.toString()]);
  }

  async getAccessRights() {
    await this.runTaskService.runTask('', async() => {
      this.items = this.sessionService.getReciterDetails()?.access;
      this.hasAccess = !!this.items?.length;
    });
  }
}
