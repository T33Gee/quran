import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-efforts',
  templateUrl: './efforts.component.html',
  styleUrls: ['./efforts.component.scss']
})
export class EffortsComponent implements OnInit {

  routeSubscription: Subscription; 
  groupId:  number;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(r => this.groupId = +r["groupId"]).unsubscribe();
    console.log(this.groupId);
  }



}
