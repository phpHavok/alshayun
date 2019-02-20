import { TestBed } from '@angular/core/testing';

import { AppletsService } from './applets.service';

describe('AppletsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppletsService = TestBed.get(AppletsService);
    expect(service).toBeTruthy();
  });
});
