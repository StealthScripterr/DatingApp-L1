import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/services/account-service';
import { RegisterData } from '../../types/user';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  @Input() isOpen = false;
  @Output() readonly closed = new EventEmitter<void>();
  @Output() readonly switchToLogin = new EventEmitter<void>();

  protected account = inject(AccountService);
  protected registerData: RegisterData = {
    displayName: '',
    age: '',
    email: '',
    password: '',
    profileImageUrl: '',
  };
  protected loggedInResponse: any = {};

  register() {
    this.account.register(this.registerData).subscribe({
      next: (response) => {
        this.loggedInResponse = response;
        this.closed.emit();
        console.log('Registration successful:', response);
      },
      error: (error) => {
        console.error('Registration failed:', error);
      },
    });
  }

  closeRegisterModal(): void {
    this.closed.emit();
  }

  openLoginModal(): void {
    this.switchToLogin.emit();
  }
}
