import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeNewsleterComponent } from './home-newsleter.component';

describe('HomeNewsleterComponent', () => {
  let component: HomeNewsleterComponent;
  let fixture: ComponentFixture<HomeNewsleterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeNewsleterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeNewsleterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
