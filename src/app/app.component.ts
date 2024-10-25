import { Component, inject } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { FooterComponent } from './footer/footer.component';
// import { AuthService } from '@auth0/auth0-angular';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { catchError, first, of, tap } from 'rxjs';
import { TodosService } from './todos.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    TodoListComponent,
    FooterComponent,
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  authService = inject(AuthService);
  todoService = inject(TodosService);
  errorMessage!: string;
  isLoggedinUser!: any;

  ngOnInit() {
    this.authService.userLoggedInStatus$.subscribe((userId) => {
      this.todoService.readUserwiseTodo(userId?.uid);
    });
    // 'ymBL6VkuJUQ7IkgIPmGPu7Lpsmf1'
  }

  login() {
    this.authService
      .login()
      .pipe(
        first(),
        catchError((error) => {
          this.errorMessage = error.message;
          return of(null);
        })
      )
      .subscribe((isLoggedinUser) => {
        this.isLoggedinUser = isLoggedinUser;
      });
  }

  logout() {
    this.authService.logout();
  }
}
