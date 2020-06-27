import { Component, OnInit, Input } from '@angular/core';
import { Part, KhatamEffort, KhatamEffortStatusEnum } from 'src/app/models/api-models/effort.model';

@Component({
  selector: 'app-khatam-effort',
  templateUrl: './khatam-effort.component.html',
  styleUrls: ['./khatam-effort.component.scss']
})
export class KhatamEffortComponent implements OnInit {

  @Input() parts: Part[];
  @Input() effort: KhatamEffort;
  sortedParts: Part[] = []; 
  KhatamEffortStatusEnum = KhatamEffortStatusEnum;
  
  constructor() { }

  ngOnInit(): void {
    this.effort.parts = this.effort.parts.sort((a,b)=> a.partId - b.partId);
  }

}
