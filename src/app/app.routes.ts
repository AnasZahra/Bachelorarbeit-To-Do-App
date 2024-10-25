import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

// AuthGuard provided by angular fire library
import { AuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
// AuthGuard provided by angular fire library
const unauthRedirect = () => redirectUnauthorizedTo(['/login']);

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'all',
    component: AppComponent,
    canActivate: [AuthGuard], // Use builtin library AuthGuard. See above import statements.
    data: { authGuardPipe: unauthRedirect }, // see above unauthRedirect() method.
  },
  { path: 'active', component: AppComponent },
  { path: 'completed', component: AppComponent },
  { path: '', redirectTo: '/all', pathMatch: 'full' },
];
