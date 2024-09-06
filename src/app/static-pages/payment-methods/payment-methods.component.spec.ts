import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentMethods } from './payment-methods.component';

describe('PaymentMethods', () => {
  let component: PaymentMethods;
  let fixture: ComponentFixture<PaymentMethods>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentMethods ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentMethods);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
