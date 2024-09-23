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

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  deleteTask(taskId: string){
    this.taskService.deleteTask(taskId).subscribe({
      next: () => {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
        console.log('Task deleted successfully');
      },
      error: (err) => {
        console.error('Error deleting task:', err); 
      }
    });
  }

  updateTaskStatus(updatedTask: Task){
    this.taskService.updateTask(updatedTask).subscribe(() => {
      const index = this.tasks.findIndex(task => task.id === updatedTask.id);
      if(index !== -1){
        this.tasks[index] = updatedTask
      }
    })
  }

}
