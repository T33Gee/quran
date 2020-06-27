import { Component, OnInit, Input } from '@angular/core';
import { SurahEffort, Chapter } from 'src/app/models/api-models/effort.model';

@Component({
  selector: 'app-surah-effort',
  templateUrl: './surah-effort.component.html',
  styleUrls: ['./surah-effort.component.scss']
})
export class SurahEffortComponent implements OnInit {

  @Input() effort: SurahEffort;
  @Input() chapters: Chapter[];

  constructor() { }

  ngOnInit(): void {
  }

}
