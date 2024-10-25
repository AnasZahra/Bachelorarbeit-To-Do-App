import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodosService } from '../todos.service';
import { AuthService } from '../auth.service';

@Component({
  standalone: true,
  selector: 'app-todo-header',
  imports: [FormsModule],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  private todosService = inject(TodosService);
  private authService = inject(AuthService);

  title = '';

  addTodo() {
    if (this.title) {
      this.todosService.addItem(this.title);

      //Call firebase add method...

      this.todosService
        .addUserwiseTodo(
          this.authService.loggedInCurrentUser()?.uid,
          this.title
        )
        .subscribe((addDocRef) => {
          // Reset title to clear input field.
          this.title = '';
        });
    }
  }
}
