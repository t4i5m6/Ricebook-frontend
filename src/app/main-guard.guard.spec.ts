import { TestBed } from '@angular/core/testing';

import { MainGuard } from './main-guard.guard';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('MainGuardGuard', () => {
  let guard: MainGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
    guard = TestBed.inject(MainGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
