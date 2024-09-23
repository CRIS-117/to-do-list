import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Task } from 'src/app/core/models/tasks/task.model';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.css']
})
export class TaskCardComponent implements OnInit {

/* The code snippet provided is a TypeScript class for an Angular component called `TaskCardComponent`.
Let's break down the annotations: */
  @Input() task!: Task;
  @Output() deleteTask = new EventEmitter<string>();
  @Output() toggleStatus = new EventEmitter<Task>();

  constructor() { }

  ngOnInit(): void {
    console.log(this.task.status)
  }

  /**
   * The `onDelete` function emits an event to delete a task with a specific ID.
   */
  onDelete() {
    this.deleteTask.emit(this.task.id);
  }

  /**
   * The function `onToggleStatus` updates the status of a task and emits the updated task using an
   * event emitter.
   */
  onToggleStatus() {
    const updatedTask: Task = { 
      ...this.task, 
      // status: !this.task.status 
    };
    this.toggleStatus.emit(updatedTask); 
  }

}
