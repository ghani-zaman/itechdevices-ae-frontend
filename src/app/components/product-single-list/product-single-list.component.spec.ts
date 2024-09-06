import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSingleListComponent } from './product-single-list.component';

describe('ProductSingleListComponent', () => {
  let component: ProductSingleListComponent;
  let fixture: ComponentFixture<ProductSingleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductSingleListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSingleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
