import { TestBed } from '@angular/core/testing';

import { PleaganService } from './pleagan.service';

describe('PleaganService', () => {
  let service: PleaganService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PleaganService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
