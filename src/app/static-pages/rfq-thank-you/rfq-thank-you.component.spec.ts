import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RfaThankYou } from './rfq-thank-you.component';

describe('RfaThankYou', () => {
  let component: RfaThankYou;
  let fixture: ComponentFixture<RfaThankYou>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RfaThankYou ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RfaThankYou);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
