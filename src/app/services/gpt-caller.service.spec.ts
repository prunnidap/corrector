import { TestBed } from '@angular/core/testing';

import { GptCallerService } from './gpt-caller.service';

describe('GptCallerService', () => {
  let service: GptCallerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GptCallerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
