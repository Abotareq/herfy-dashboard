import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/auth/login.service';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

export const userGuardTsGuard: CanActivateFn = () => {
  const userAuth = inject(LoginService);
  const router = inject(Router);

  return userAuth.isUserLoggedIn().pipe(
    map((loggedIn) => {
      if (loggedIn) {
        return true;
      } else {
        router.navigate(['/login']);
        return false;
      }
    }),
    catchError(() => {
      router.navigate(['/login']);
      return of(false);
    })
  );
};
