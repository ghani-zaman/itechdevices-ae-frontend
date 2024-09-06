import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductIndustriesComponent } from './product-industries.component';

describe('ProductIndustriesComponent', () => {
  let component: ProductIndustriesComponent;
  let fixture: ComponentFixture<ProductIndustriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductIndustriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductIndustriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
