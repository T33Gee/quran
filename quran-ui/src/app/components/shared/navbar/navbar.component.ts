import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  showNav = false;
  constructor(private router: Router) { }

  ngOnInit(): void {
    const url = this.router.routerState.snapshot.url;
    this.showNav = url !== "/login" && url !== "";
  }

}
