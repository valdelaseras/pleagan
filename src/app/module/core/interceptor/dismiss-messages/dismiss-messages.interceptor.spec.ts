import { TestBed } from '@angular/core/testing';

import { HttpSuccessInterceptor } from './http-error.interceptor';

describe('HttpErrorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HttpSuccessInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: HttpSuccessInterceptor = TestBed.inject(HttpSuccessInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
