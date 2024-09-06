import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestSellingCategoryComponent } from './best-selling-category.component';

describe('BestSellingCategoryComponent', () => {
  let component: BestSellingCategoryComponent;
  let fixture: ComponentFixture<BestSellingCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BestSellingCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BestSellingCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
