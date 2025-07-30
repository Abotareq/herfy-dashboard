import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { userGuardTsGuard } from './user-guard.ts-guard';

describe('userGuardTsGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => userGuardTsGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
