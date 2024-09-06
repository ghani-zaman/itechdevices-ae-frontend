import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedirectPermanentComponent } from './redirect-permanent.component';

describe('RedirectPermanentComponent', () => {
  let component: RedirectPermanentComponent;
  let fixture: ComponentFixture<RedirectPermanentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RedirectPermanentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RedirectPermanentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
