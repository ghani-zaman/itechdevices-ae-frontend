import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMiddleBannersComponent } from './home-middle-banners.component';

describe('HomeMiddleBannersComponent', () => {
  let component: HomeMiddleBannersComponent;
  let fixture: ComponentFixture<HomeMiddleBannersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeMiddleBannersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeMiddleBannersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
