import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AccountSevice } from '../services/account-sevice';
import { ToastService } from '../services/toast-service';

export const authGuard: CanActivateFn = () => {
  const accountService = inject(AccountSevice);
  const toast = inject(ToastService);

  if(accountService.currentUser())  return true;
  else {
    toast.error("Please Login first.")
    return false;
  }
};
