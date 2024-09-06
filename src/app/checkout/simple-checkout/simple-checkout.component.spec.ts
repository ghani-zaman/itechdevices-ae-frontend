import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleCheckoutComponent } from './simple-checkout.component';

describe('SimpleCheckoutComponent', () => {
  let component: SimpleCheckoutComponent;
  let fixture: ComponentFixture<SimpleCheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimpleCheckoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
