import { TestBed } from '@angular/core/testing';

import { UrlencoderService } from './urlencoder.service';

describe('UrlencoderService', () => {
  let service: UrlencoderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UrlencoderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
