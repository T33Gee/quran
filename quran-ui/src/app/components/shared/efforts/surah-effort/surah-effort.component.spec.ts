import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurahEffortComponent } from './surah-effort.component';

describe('SurahEffortComponent', () => {
  let component: SurahEffortComponent;
  let fixture: ComponentFixture<SurahEffortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurahEffortComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurahEffortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
