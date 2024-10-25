import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  AfterViewChecked,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Todo, TodosService } from '../todos.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './todo-item.component.html',
})
export class TodoItemComponent implements AfterViewChecked {
  @Input({ required: true }) todo!: Todo;

  @Output() remove = new EventEmitter<Todo>();

  @ViewChild('todoInputRef') inputRef?: ElementRef;

  todoService = inject(TodosService);
  authService = inject(AuthService);

  title = '';

  isEditing = false;

  toggleTodo(docId: any): void {
    this.todoService
      .updateUserwiseSpecificField(
        this.authService.loggedInCurrentUser()?.uid,
        docId,
        'completed',
        !this.todo.completed
      )
      .subscribe((isUpdated) => console.log({ isUpdated }));

    this.todo.completed = !this.todo.completed;
  }

  removeTodo(todoId: any): void {
    this.remove.emit(this.todo);

    this.todoService
      .deleteUserwiseSpecificField(
        this.authService.loggedInCurrentUser()?.uid,
        todoId
      )
      .subscribe((isRecordDeleted) => console.log({ isRecordDeleted }));
  }

  startEdit() {
    this.isEditing = true;
  }

  handleBlur(e: Event) {
    this.isEditing = false;
  }

  handleFocus(e: Event) {
    this.title = this.todo.title;
  }

  updateTodo(todoId: any) {
    if (!this.title) {
      this.remove.emit(this.todo);
      // If user remove input texts and blank record enter event fires then remove that todo from firebase..
      this.todoService
        .deleteUserwiseSpecificField(
          this.authService.loggedInCurrentUser()?.uid,
          todoId
        )
        .subscribe((isRecordDeleted) => console.log({ isRecordDeleted }));
    } else {
      // If value present in input text then edit..
      this.todo.title = this.title;

      // call service to update firebase record..
      this.todoService
        .updateUserwiseSpecificField(
          this.authService.loggedInCurrentUser()?.uid,
          todoId,
          'title',
          this.title
        )
        .subscribe((isUpdated) => console.log({ isUpdated }));
    }

    this.isEditing = false;
  }

  ngAfterViewChecked(): void {
    if (this.isEditing) {
      this.inputRef?.nativeElement.focus();
    }
  }
}
