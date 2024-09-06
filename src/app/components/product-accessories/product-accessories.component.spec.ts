import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAccessoriesComponent } from './product-accessories.component';

describe('ProductAccessoriesComponent', () => {
  let component: ProductAccessoriesComponent;
  let fixture: ComponentFixture<ProductAccessoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductAccessoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductAccessoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
