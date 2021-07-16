import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavItemEnum } from 'src/app/models/view-modes';
import { NavbarAccessService } from 'src/app/services/backend/navbar.service';
import { RunTaskService } from 'src/app/services/run-task.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  hasAccess = false;
  NavItemEnum = NavItemEnum;
  items: NavItemEnum[];
  constructor( private router: Router, private runTaskService: RunTaskService, private navbarService: NavbarAccessService) { }

  async ngOnInit(): Promise<void> {
    await this.runTaskService.runTask('', async() => {
      this.items = (await this.navbarService.getUserAccess(''));
      this.hasAccess = !!this.items.length;
    })
  }

  navigateTo(link: NavItemEnum) {
    this.router.navigate([link.toString()]);
  }
}
