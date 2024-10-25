import { Injectable, Signal, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Auth, signOut, user, User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UserCredential, signInWithEmailAndPassword } from '@firebase/auth';
import { Observable, from, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  firebaseAuthService = inject(Auth);
  userLoggedInStatus$ = user(this.firebaseAuthService);
  router = inject(Router);

  loggedInCurrentUser: Signal<User | null | undefined> = toSignal(
    this.userLoggedInStatus$
  );

  login(
    user: any = { email: 'todo@todo.com', password: 'todo12' }
  ): Observable<UserCredential> {
    const firebaseLoginPromise = signInWithEmailAndPassword(
      this.firebaseAuthService,
      user.email,
      user.password
    );
    return from(firebaseLoginPromise);
  }
  logout() {
    console.log('logout');
    signOut(this.firebaseAuthService).then((resolve) =>
      this.router.navigateByUrl('/login')
    );
  }
}
