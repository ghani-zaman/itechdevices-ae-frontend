import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAvailability } from './product-availability.component';

describe('ProductAvailability', () => {
  let component: ProductAvailability;
  let fixture: ComponentFixture<ProductAvailability>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductAvailability ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductAvailability);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
