import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { FilterEnum } from '../../types/filter.enum';

@Component({
  selector: 'app-task-footer',
  templateUrl: './footer.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class FooterComponent {
  taskService = inject(TaskService);
  filterSig = this.taskService.filterSig;
  filterEnum = FilterEnum;
  activeCount = computed(() => {
    return this.taskService.taskSig().filter((task) => !task.isCompleted)
      .length;
  });

  noTaskClass = computed(() => this.taskService.taskSig().length === 0);
  
  itemsLeftText = computed(
    () => `item${this.activeCount() !== 1 ? 's' : ''} left`
  );

  changeFilter(event: Event, filterName: FilterEnum): void {
    event.preventDefault();
    this.taskService.changeFilter(filterName);
    console.log('after changeFilter', this.taskService.filterSig());
  }
}
