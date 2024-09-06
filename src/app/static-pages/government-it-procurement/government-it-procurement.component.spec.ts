import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GovernmentItProcurement } from './government-it-procurement.component';

describe('GovernmentItProcurement', () => {
  let component: GovernmentItProcurement;
  let fixture: ComponentFixture<GovernmentItProcurement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GovernmentItProcurement ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GovernmentItProcurement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
