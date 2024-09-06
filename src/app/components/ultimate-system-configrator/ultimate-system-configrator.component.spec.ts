import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UltimateSystemConfigratorComponent } from './ultimate-system-configrator.component';

describe('UltimateSystemConfigratorComponent', () => {
  let component: UltimateSystemConfigratorComponent;
  let fixture: ComponentFixture<UltimateSystemConfigratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UltimateSystemConfigratorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UltimateSystemConfigratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
