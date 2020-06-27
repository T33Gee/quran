import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KhatamEffortComponent } from './khatam-effort.component';

describe('KhatamEffortComponent', () => {
  let component: KhatamEffortComponent;
  let fixture: ComponentFixture<KhatamEffortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KhatamEffortComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KhatamEffortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
