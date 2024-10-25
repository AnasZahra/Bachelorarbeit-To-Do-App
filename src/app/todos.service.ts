import { inject, Injectable, signal } from '@angular/core';
import { from, take, tap } from 'rxjs';

import {
  addDoc,
  arrayUnion,
  collectionData,
  deleteDoc,
  doc,
  docData,
  Firestore,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { collection } from 'firebase/firestore';

export interface Todo {
  title: string;
  completed: boolean;
  id?: string;
}

@Injectable({ providedIn: 'root' })
export class TodosService {
  todos: Todo[] = [];
  isLoading = signal(true);

  firestore: Firestore = inject(Firestore);

  addItem(title: string): void {
    const todo: Todo = {
      title,
      completed: false,
    };
    this.todos.push(todo);
    console.log(this.todos);
  }

  removeItem(todo: Todo): void {
    const index = this.todos.indexOf(todo);
    this.todos.splice(index, 1);
  }

  clearCompleted(): void {
    this.todos = this.todos.filter((todo) => !todo.completed);
  }

  toggleAll(completed: boolean): void {
    this.todos = this.todos.map((todo) => ({ ...todo, completed }));
  }

  getItems(type = 'all'): Todo[] {
    switch (type) {
      case 'active':
        return this.todos.filter((todo) => !todo.completed);
      case 'completed':
        return this.todos.filter((todo) => todo.completed);
    }

    return this.todos;
  }

  // Firebase methods are starting from below...

  readUserwiseTodo(userId: any) {
    let usersCollection = collection(this.firestore, `users/${userId}/todos`);
    console.log('C-ID ', userId);
    collectionData<any>(usersCollection).subscribe((userData: Todo[]) => {
      console.log(userData);
      this.todos = [...userData];
      this.isLoading.set(false);
    });
  }

  addUserwiseTodo(userId: any, title: any) {
    const todo: Todo = {
      title: title,
      completed: false,
    };
    let addCollection = collection(this.firestore, `users/${userId}/todos`);

    return from(
      addDoc(addCollection, todo).then((ref) => {
        setDoc(ref, { ...todo, id: ref.id });
      })
    );
  }

  async toggleUserwiseTodo(userId: any, completed: boolean) {
    this.todos.forEach(async (todo) => {
      const currentTodo = doc(
        this.firestore,
        `users/${userId}/todos/${todo.id}`
      );
      await updateDoc(currentTodo, {
        completed: completed,
      });
    });
  }
  updateUserwiseSpecificField(
    userId: any,
    docId: any,
    field: string,
    value: any
  ) {
    // console.log({ userId }, { docId }, { field }, { value });
    const currentDoc = doc(this.firestore, `users/${userId}/todos/${docId}`);
    return from(
      updateDoc(currentDoc, {
        [field]: value,
      })
    );
  }

  async deleteAllCompletedTodos(userId?: any) {
    this.todos.forEach(async (todo) => {
      if (todo.completed) {
        const currentDoc = doc(
          this.firestore,
          `users/${userId}/todos/${todo.id}`
        );
        await deleteDoc(currentDoc);
      }
    });
  }

  deleteUserwiseSpecificField(userId: any, docId: any) {
    const currentDoc = doc(this.firestore, `users/${userId}/todos/${docId}`);
    return from(deleteDoc(currentDoc));
  }
}
