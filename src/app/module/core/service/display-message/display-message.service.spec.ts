import { TestBed } from '@angular/core/testing';

import { DisplayMessageService } from './display-message.service';

describe('ErrorService', () => {
  let service: DisplayMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DisplayMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
