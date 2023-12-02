import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const roleGuard: CanActivateFn = (route, state) => {
  const role = route.data['role'];

  const router = inject(Router);
  if(role === 'ADMIN') {
    return true;
  } else {
    router.navigate(['login'])
    return false;
  }
  return true;
};
