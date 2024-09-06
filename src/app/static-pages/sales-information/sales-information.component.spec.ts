import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesInformation } from './sales-information.component';

describe('SalesInformation', () => {
  let component: SalesInformation;
  let fixture: ComponentFixture<SalesInformation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesInformation ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesInformation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
