import { TestBed } from '@angular/core/testing';

import { RegulatorGuard } from './regulator.guard';

describe('RegulatorGuard', () => {
  let guard: RegulatorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RegulatorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
