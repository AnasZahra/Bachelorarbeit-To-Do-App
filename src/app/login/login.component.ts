import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { AuthService } from '../auth.service';
import { catchError, first, of } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  authService = inject(AuthService);
  email: string = '';
  password: string = '';
  errorMessage: string = ''; // Variable to store error messages
  onLogin() {
    this.authService
      .login({ email: this.email, password: this.password })
      .pipe(
        first(),
        catchError((error) => {
          this.errorMessage = error.message;
          return of(null);
        })
      )
      .subscribe((isLoggedinUser) => {});
  }
}
