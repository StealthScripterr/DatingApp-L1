import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/services/account-service';
import { AuthModalService } from '../../core/services/auth-modal.service';
import { LoginCredentials } from '../../types/user';
import { Router } from '@angular/router';
import { ToastService } from '../../core/services/toast-service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  @Input() isOpen = false;
  @Output() readonly closed = new EventEmitter<void>();
  @Output() readonly switchToRegister = new EventEmitter<void>();

  protected account = inject(AccountService);
  protected authModal = inject(AuthModalService);
  protected toast = inject(ToastService);
  protected router = inject(Router);
  protected creds: LoginCredentials = {
    email : '',
    password : ''
  };
  protected loggedInResponse: any = {};

  login() {
    this.account.login(this.creds).subscribe({
      next: (response) => {
        this.toast.showSuccess('Login Successful');
        this.loggedInResponse = response;
        this.closed.emit();
        this.authModal.onLoginSuccess();
        console.log('Login successful:', response);
      },
      error: (error) => {
        this.toast.showError(`Login Failed ${error.error}`);
        console.error('Login failed:', error);
      },
    });
  }

  closeLoginModal(): void {
    this.closed.emit();
    this.authModal.cancelLogin();
  }

  openRegisterModal(): void {
    this.switchToRegister.emit();
  }
}
