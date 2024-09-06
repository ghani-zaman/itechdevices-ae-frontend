import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartNumberIdentification } from './part-number-identification.component';

describe('PartNumberIdentification', () => {
  let component: PartNumberIdentification;
  let fixture: ComponentFixture<PartNumberIdentification>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartNumberIdentification ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartNumberIdentification);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
