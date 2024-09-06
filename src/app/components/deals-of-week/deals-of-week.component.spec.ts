import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealsOfWeekComponent } from './deals-of-week.component';

describe('DealsOfWeekComponent', () => {
  let component: DealsOfWeekComponent;
  let fixture: ComponentFixture<DealsOfWeekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealsOfWeekComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DealsOfWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
