import { CanActivateFn } from '@angular/router';
import { AccountService } from '../services/account-service';
import { AuthModalService } from '../services/auth-modal.service';
import { ToastService } from '../services/toast-service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  const toast = inject(ToastService);
  const authModal = inject(AuthModalService);

  if (accountService.currentUser()) {
    return true;
  }

  toast.showError('Please login to continue...');
  authModal.openLogin(state.url, 'guard');
  return false;
};
