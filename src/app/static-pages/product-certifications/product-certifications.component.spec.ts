import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCertifications } from './product-certifications.component';

describe('ProductCertifications', () => {
  let component: ProductCertifications;
  let fixture: ComponentFixture<ProductCertifications>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductCertifications ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCertifications);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
