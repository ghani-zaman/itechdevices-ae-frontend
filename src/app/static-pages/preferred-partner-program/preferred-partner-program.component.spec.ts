import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferredPartnerProgram } from './preferred-partner-program.component';

describe('PreferredPartnerProgram', () => {
  let component: PreferredPartnerProgram;
  let fixture: ComponentFixture<PreferredPartnerProgram>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreferredPartnerProgram ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreferredPartnerProgram);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
