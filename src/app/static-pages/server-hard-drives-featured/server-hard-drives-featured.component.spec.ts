import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerHardDrivesFeatured } from './server-hard-drives-featured';

describe('ServerHardDrivesFeatured', () => {
  let component: ServerHardDrivesFeatured;
  let fixture: ComponentFixture<ServerHardDrivesFeatured>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServerHardDrivesFeatured ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServerHardDrivesFeatured);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
