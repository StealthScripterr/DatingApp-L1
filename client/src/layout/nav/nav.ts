import { Component, inject } from '@angular/core';
import { AccountService } from '../../core/services/account-service';
import { AuthModalService } from '../../core/services/auth-modal.service';
import { Login } from '../../features/login/login';
import { Register } from '../../features/register/register';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastService } from '../../core/services/toast-service';

@Component({
  selector: 'app-nav',
  imports: [Login, Register, RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  protected readonly modal = inject(AuthModalService);
  protected toast = inject(ToastService);
  protected account = inject(AccountService);
  protected router = inject(Router);

  protected get isLoginOpen() {
    return this.modal.isLoginOpen();
  }

  protected get isRegisterOpen() {
    return this.modal.isRegisterOpen();
  }

  logout() {
    this.account.logout();
    this.toast.showInfo('Successfully logged out!');
    this.router.navigateByUrl('/');
  }

  openLoginModal(): void {
    this.modal.openLogin();
  }

  openRegisterModal(): void {
    this.modal.openRegister();
  }

  switchFromRegisterToLogin(): void {
    this.modal.switchToLogin();
  }

  switchFromLoginToRegister(): void {
    this.modal.switchToRegister();
  }

  closeLoginModal(): void {
    this.modal.closeLogin();
  }

  closeRegisterModal(): void {
    this.modal.closeRegister();
  }
}
