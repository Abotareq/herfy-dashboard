import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/auth/login.service';

export const userGuardTsGuard: CanActivateFn = (route, state) => {
  // inject user.service (LoginService)
  let userAuth = inject(LoginService)
  let router = inject(Router);
  if(userAuth.checkCookie()){
    return true
  }else{
    router.navigate(['/login']);
    return false
  }
}
