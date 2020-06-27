import { Component, OnInit, AfterViewInit, ViewChild, Input } from '@angular/core';
import { CollapseComponent } from 'angular-bootstrap-md';
import { EffortTypeEnum } from 'src/app/models/api-models/effort.model';

@Component({
  selector: 'app-collapsible-card',
  templateUrl: './collapsible-card.component.html',
  styleUrls: ['./collapsible-card.component.scss']
})
export class CollapsibleCardComponent implements OnInit {
  @Input() effortType: EffortTypeEnum;
  EffortTypeEnum = EffortTypeEnum;
  constructor() { }

  ngOnInit(): void {
  }

}
