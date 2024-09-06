import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandsLogoSliderComponent } from './brands-logo-slider.component';

describe('BrandsLogoSliderComponent', () => {
  let component: BrandsLogoSliderComponent;
  let fixture: ComponentFixture<BrandsLogoSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrandsLogoSliderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandsLogoSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
