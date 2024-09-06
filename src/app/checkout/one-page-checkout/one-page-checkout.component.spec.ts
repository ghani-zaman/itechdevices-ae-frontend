import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnePageCheckoutComponent } from './one-page-checkout.component';

describe('OnePageCheckoutComponent', () => {
  let component: OnePageCheckoutComponent;
  let fixture: ComponentFixture<OnePageCheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnePageCheckoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnePageCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
