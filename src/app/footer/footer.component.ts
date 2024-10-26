import { Component, inject } from '@angular/core';
import { Location } from '@angular/common';
import { Todo, TodosService } from '../todos.service';
import { RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-todo-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  private location = inject(Location);
  private todosService = inject(TodosService);
  private authService = inject(AuthService);

  get todos(): Todo[] {
    return this.todosService.getItems();
  }

  get activeTodos(): Todo[] {
    return this.todosService.getItems('active');
  }

  get completedTodos(): Todo[] {
    return this.todosService.getItems('completed');
  }

  get filter(): string {
    return this.location.path().split('/')[1] || 'all';
  }

  clearCompleted() {
    this.todosService.deleteAllCompletedTodos(
      this.authService.loggedInCurrentUser()?.uid
    );
    this.todosService.clearCompleted();
  }

  confirmClearCompleted() {
    const confirmed = confirm("Are you sure you want to clear all completed tasks?");
    if (confirmed) {
      // Only proceed with deletion if the user confirms
      this.todosService.deleteAllCompletedTodos(
        this.authService.loggedInCurrentUser()?.uid
      );
      this.todosService.clearCompleted();
    }
  }
  
}
