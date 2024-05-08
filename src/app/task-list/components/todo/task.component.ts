import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { TaskInterface } from '../../types/task.interface';

@Component({
  selector: 'app-task-item',
  templateUrl: './task.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class TaskComponent implements OnInit, OnChanges {
  @Input({ required: true }) task!: TaskInterface;
  @Input({ required: true }) isEditing!: boolean;
  @Output() setEditingId: EventEmitter<string | null> = new EventEmitter();

  @ViewChild('textInput') textInput?: ElementRef;

  taskService = inject(TaskService);
  editingText: string = '';

  ngOnInit(): void {
    this.editingText = this.task.text;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isEditing'].currentValue) {
      setTimeout(() => {
        this.textInput?.nativeElement.focus();
      }, 0);
    }
  }

  changeText(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.editingText = value;
  }

  changeTask(): void {

    if(!this.editingText){
      this.editingText = this.task.text;
      return;
    }

    this.taskService.changeTask(this.task.id, this.editingText);
    this.setEditingId.emit(null);
  }

  setTaskInEditMode(): void {
    this.setEditingId.emit(this.task.id);
  }

  removeTask(): void {
    this.taskService.removeTask(this.task.id);
  }

  toggleTask(): void {
    this.taskService.toggleTask(this.task.id);
  }
}
