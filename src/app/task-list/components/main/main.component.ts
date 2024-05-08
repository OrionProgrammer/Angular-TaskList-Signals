import { Component, computed, inject } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';
import { FilterEnum } from '../../types/filter.enum';
import { TaskComponent } from '../todo/task.component';

@Component({
  selector: 'app-task-main',
  templateUrl: './main.component.html',
  standalone: true,
  imports: [CommonModule, TaskComponent],
})
export class MainComponent {
  taskService = inject(TaskService);
  editingId: string | null = null;

  visibleTasks = computed(() => {
    const tasks = this.taskService.taskSig();
    const filter = this.taskService.filterSig();

    if (filter === FilterEnum.active) {
      return tasks.filter((task) => !task.isCompleted);
    } else if (filter === FilterEnum.completed) {
      return tasks.filter((task) => task.isCompleted);
    }
    return tasks;
  });

  isAllTaskSelected = computed(() =>
    this.taskService.taskSig().every((task) => task.isCompleted)
  );
  
  noTaskClass = computed(() => this.taskService.taskSig().length === 0);

  setEditingId(editingId: string | null): void {
    this.editingId = editingId;
  }

  toggleAllTasks(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.taskService.toggleAll(target.checked);
  }
}
