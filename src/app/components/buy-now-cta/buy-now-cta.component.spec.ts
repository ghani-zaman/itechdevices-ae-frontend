import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyNowCtaComponent } from './buy-now-cta.component';

describe('BuyNowCtaComponent', () => {
  let component: BuyNowCtaComponent;
  let fixture: ComponentFixture<BuyNowCtaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyNowCtaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyNowCtaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
