import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthModalService {
  private router = inject(Router);

  readonly isLoginOpen = signal(false);
  readonly isRegisterOpen = signal(false);
  readonly attemptedUrl = signal<string | null>(null);
  readonly loginSource = signal<'default' | 'guard'>('default');

  openLogin(attemptedUrl: string | null = null, source: 'default' | 'guard' = 'default'): void {
    this.isRegisterOpen.set(false);
    this.isLoginOpen.set(true);
    this.attemptedUrl.set(attemptedUrl);
    this.loginSource.set(source);
  }

  openRegister(): void {
    this.isLoginOpen.set(false);
    this.isRegisterOpen.set(true);
    this.attemptedUrl.set(null);
    this.loginSource.set('default');
  }

  closeLogin(): void {
    this.isLoginOpen.set(false);
  }

  closeRegister(): void {
    this.isRegisterOpen.set(false);
  }

  closeAll(): void {
    this.isLoginOpen.set(false);
    this.isRegisterOpen.set(false);
  }

  switchToLogin(): void {
    this.isRegisterOpen.set(false);
    this.isLoginOpen.set(true);
    this.loginSource.set('default');
    this.attemptedUrl.set(null);
  }

  switchToRegister(): void {
    this.isLoginOpen.set(false);
    this.isRegisterOpen.set(true);
    this.loginSource.set('default');
    this.attemptedUrl.set(null);
  }

  cancelLogin(): void {
    const source = this.loginSource();
    this.closeLogin();

    if (source === 'default') {
      this.resetState();
      this.router.navigateByUrl('/');
      return;
    }

    this.resetState();
  }

  onLoginSuccess(): void {
    const source = this.loginSource();
    const redirectUrl = this.attemptedUrl() ?? '/';

    this.resetState();

    if (source === 'guard') {
      this.router.navigateByUrl(redirectUrl);
      return;
    }

    this.router.navigateByUrl('/');
  }

  private resetState(): void {
    this.isLoginOpen.set(false);
    this.isRegisterOpen.set(false);
    this.attemptedUrl.set(null);
    this.loginSource.set('default');
  }
}
