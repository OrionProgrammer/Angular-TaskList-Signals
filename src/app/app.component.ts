import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TasksComponent} from './task-list/tasks.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [RouterOutlet, TasksComponent],
})
export class AppComponent {}
