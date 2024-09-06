import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountBenefitsComponent } from './account-benefits.component';

describe('AccountBenefitsComponent', () => {
  let component: AccountBenefitsComponent;
  let fixture: ComponentFixture<AccountBenefitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountBenefitsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountBenefitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
