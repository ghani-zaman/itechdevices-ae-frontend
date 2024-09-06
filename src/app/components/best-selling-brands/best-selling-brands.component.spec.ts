import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestSellingBrandsComponent } from './best-selling-brands.component';

describe('BestSellingBrandsComponent', () => {
  let component: BestSellingBrandsComponent;
  let fixture: ComponentFixture<BestSellingBrandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BestSellingBrandsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BestSellingBrandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
