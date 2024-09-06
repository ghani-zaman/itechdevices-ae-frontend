import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Shipping } from './shipping.component';

describe('Shipping', () => {
  let component: Shipping;
  let fixture: ComponentFixture<Shipping>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Shipping ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Shipping);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
