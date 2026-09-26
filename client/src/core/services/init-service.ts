import { inject, Injectable } from '@angular/core';
import { AccountService } from './account-service';

@Injectable({
  providedIn: 'root',
})
export class InitService {
  private accountService = inject(AccountService);

  initialize(): Promise<void> {
    const userJson = localStorage.getItem('user');

    if (userJson) {
      try {
        const user = JSON.parse(userJson);
        this.accountService.currentUser.set(user);
      } catch {
        localStorage.removeItem('user');
      }
    }

    return Promise.resolve();
  }
}
