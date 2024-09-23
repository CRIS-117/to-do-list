import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Task } from 'src/app/core/models/tasks/task.model';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.css']
})
export class TaskCardComponent implements OnInit {

  @Input() task!: Task;
  @Output() deleteTask = new EventEmitter<string>();
  @Output() toggleStatus = new EventEmitter<Task>();

  constructor() { }

  ngOnInit(): void {
    console.log(this.task.status)
  }

  onDelete() {
    this.deleteTask.emit(this.task.id);
  }

  onToggleStatus() {
    const updatedTask: Task = { 
      ...this.task, 
      // status: !this.task.status 
    };
    this.toggleStatus.emit(updatedTask); 
  }

}
