import { Component, inject } from '@angular/core';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-header',
  templateUrl: './header.component.html',
  standalone: true,
})
export class HeaderComponent {
  taskService = inject(TaskService);
  text: string = '';

  changeText(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.text = target.value;
  }

  addTask(): void {
    if(!this.text)
      return;

    this.taskService.addTask(this.text);
    this.text = '';
  }
}
