import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResendEmailConfirmationComponent } from './resend-email-confirmation.component';

describe('ResendEmailConfirmationComponent', () => {
  let component: ResendEmailConfirmationComponent;
  let fixture: ComponentFixture<ResendEmailConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResendEmailConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResendEmailConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
