import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { FooterComponent } from './footer/footer.component';
import { AuthService } from '@auth0/auth0-angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    TodoListComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {

  constructor(public auth: AuthService){{

  }}

  login() {
    this.auth.loginWithRedirect();
  }

  logout() {
    this.auth.logout({});
  }
}
