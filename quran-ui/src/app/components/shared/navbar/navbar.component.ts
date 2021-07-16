import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  hasAccess = false;
  constructor(private router: Router) { }

  ngOnInit(): void {
    const url = this.router.routerState.snapshot.url;
  }

}
