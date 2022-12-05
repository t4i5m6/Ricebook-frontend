import { TestBed } from '@angular/core/testing';

import { LoginGuard } from './login-guard.guard';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('LoginGuardGuard', () => {
  let guard: LoginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
    guard = TestBed.inject(LoginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
