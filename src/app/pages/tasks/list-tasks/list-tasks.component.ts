import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/core/services/task.service';
import { Task } from 'src/app/core/models/tasks/task.model';

@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.css']
})
export class ListTasksComponent implements OnInit {

  tasks: Task[] = [];
  filteredTasks: Task[] = [];

  totalTasks: number = 0;
  pendingTasks: number = 0;
  completeTasks: number = 0;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  calculateTasks(){ 
    this.totalTasks = this.tasks.length;
    this.pendingTasks = this.tasks.filter(task => !task.status).length;
    this.completeTasks = this.tasks.filter(task => task.status).length;
  }

  loadTasks() {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
      this.applySort();
      this.filteredTasks = tasks;
      this.calculateTasks();
    });
  }

  applyFilter(filter: string) {
    if (filter === 'all') {
      this.filteredTasks = this.tasks;
    } else if (filter === 'pending') {
      this.filteredTasks = this.tasks.filter(task => !task.status);
    } else if (filter === 'completed') {
      this.filteredTasks = this.tasks.filter(task => task.status);
    }
    this.calculateTasks();
  }

  applySort() {
    this.tasks = this.tasks.sort((a, b) => {
      if (a.status !== b.status) {
        return a.status ? 1 : -1;
      }
      return new Date(b.created_at).getTime() - new Date(b.created_at).getTime();
    })
  }

  deleteTask(taskId: string) {
    this.taskService.deleteTask(taskId).subscribe({
      next: () => {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
        this.applySort();
        this.applyFilter('all');
        console.log('Task deleted successfully');
      },
      error: (err) => {
        console.error('Error deleting task:', err);
      }
    });
  }

  updateTaskStatus(updatedTask: Task) {
    this.taskService.updateTask(updatedTask).subscribe(() => {
      const index = this.tasks.findIndex(task => task.id === updatedTask.id);
      if (index !== -1) {
        this.tasks[index] = updatedTask
      }
      this.applySort();
      this.applyFilter('all');
    })
  }

}
