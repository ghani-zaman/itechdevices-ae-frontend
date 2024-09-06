import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PowerSuppliesFeatured } from './power-supplies-featured';

describe('PowerSuppliesFeatured', () => {
  let component: PowerSuppliesFeatured;
  let fixture: ComponentFixture<PowerSuppliesFeatured>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PowerSuppliesFeatured ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PowerSuppliesFeatured);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
