import { Injectable, signal } from '@angular/core';
import { TaskInterface } from '../types/task.interface';
import { FilterEnum } from '../types/filter.enum';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  taskSig = signal<TaskInterface[]>([]);
  filterSig = signal<FilterEnum>(FilterEnum.all);

  changeFilter(filterName: FilterEnum): void {
    this.filterSig.set(filterName);
  }

  addTask(text: string): void {
    const newTask: TaskInterface = {
      text,
      isCompleted: false,
      id: Math.random().toString(16),
    };
    this.taskSig.update((tasks) => [...tasks, newTask]);
  }

  changeTask(id: string, text: string): void {
    this.taskSig.update((tasks) =>
      tasks.map((task) => (task.id === id ? { ...task, text } : task))
    );
  }

  removeTask(id: string): void {
    this.taskSig.update((tasks) => tasks.filter((task) => task.id !== id));
  }

  toggleTask(id: string): void {
    this.taskSig.update((tasks) =>
      tasks.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  }

  toggleAll(isCompleted: boolean): void {
    this.taskSig.update((tasks) =>
      tasks.map((task) => ({ ...task, isCompleted }))
    );
  }
}
