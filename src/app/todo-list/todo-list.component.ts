import { Component, inject } from '@angular/core';
import { Location } from '@angular/common';
import { Todo, TodosService } from '../todos.service';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [TodoItemComponent],
  templateUrl: './todo-list.component.html',
})
export class TodoListComponent {
  private location = inject(Location);
  private todosService = inject(TodosService);
  private authService = inject(AuthService);

  get todos(): Todo[] {
    const filter = this.location.path().split('/')[1] || 'all';
    // console.log({ filter });
    return this.todosService.getItems(filter);
  }

  get activeTodos(): Todo[] {
    return this.todosService.getItems('active');
  }

  removeTodo(todo: Todo): void {
    this.todosService.removeItem(todo);
  }

  toggleAll(e: Event) {
    const input = e.target as HTMLInputElement;
    this.todosService.toggleAll(input.checked);
    this.todosService.toggleUserwiseTodo(
      this.authService.loggedInCurrentUser()?.uid,
      input.checked
    );
  }
}
