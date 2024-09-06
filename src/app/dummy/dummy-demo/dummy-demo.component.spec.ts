import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DummyDemoComponent } from './dummy-demo.component';

describe('DummyDemoComponent', () => {
  let component: DummyDemoComponent;
  let fixture: ComponentFixture<DummyDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DummyDemoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DummyDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
