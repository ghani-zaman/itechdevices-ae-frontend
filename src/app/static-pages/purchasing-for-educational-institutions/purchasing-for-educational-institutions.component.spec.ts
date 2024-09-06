import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasingForEducationalInstitutions } from './purchasing-for-educational-institutions.component';

describe('PurchasingForEducationalInstitutions', () => {
  let component: PurchasingForEducationalInstitutions;
  let fixture: ComponentFixture<PurchasingForEducationalInstitutions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchasingForEducationalInstitutions ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasingForEducationalInstitutions);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
