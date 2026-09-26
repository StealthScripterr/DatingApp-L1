import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { LoginCredentials, RegisterData, User } from '../../types/user';
import { tap } from 'rxjs/internal/operators/tap';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private http = inject(HttpClient);
  currentUser = signal<User | null>(null);
  baseUrl = 'https://localhost:5001/api/';
  
  login(creds: LoginCredentials) {
    return this.http.post<User>(this.baseUrl + 'account/login', creds).pipe(
      tap((response: User) => {
        localStorage.setItem('user', JSON.stringify(response));
        this.currentUser.set(response);
      })
    );
  }

  logout() {
    this.currentUser.set(null);
    localStorage.removeItem('user');
  }

  getCurrentUser() {
    return this.currentUser();
  }

  isLoggedIn() {
    return this.currentUser() !== null;
  }

  getToken() {
    return this.currentUser()?.token || null;
  }

  getUserId() {
    return this.currentUser()?.id || null;
  }

  getUserDisplayName() {
    return this.currentUser()?.displayName || null;
  }

  getUserEmail() {
    return this.currentUser()?.email || null;
  }

  getUserAge() {
    return this.currentUser()?.age || null;
  }

  getUserProfileImageUrl() {
    return this.currentUser()?.profileImageUrl || null;
  }

  register(registerData: RegisterData) {
    console.log('Registering user with data:', registerData);
    return this.http.post<User>(this.baseUrl + 'account/register', registerData);
  }
}
