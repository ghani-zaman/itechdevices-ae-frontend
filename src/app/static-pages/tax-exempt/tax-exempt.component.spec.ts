import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxExempt } from './tax-exempt.component';

describe('TaxExempt', () => {
  let component: TaxExempt;
  let fixture: ComponentFixture<TaxExempt>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaxExempt ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxExempt);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
