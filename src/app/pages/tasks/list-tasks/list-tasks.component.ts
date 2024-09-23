import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/core/services/task.service';
import { Task } from 'src/app/core/models/tasks/task.model';

@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.css']
})
export class ListTasksComponent implements OnInit {

 /* The line `tasks: Task[] = [];` in the ListTasksComponent class is declaring a property named
 `tasks` which is an array of objects of type `Task`. By initializing it with an empty array `[]`,
 it ensures that the `tasks` property starts off as an empty array when an instance of
 ListTasksComponent is created. This property will be used to store the list of tasks retrieved from
 the task service and perform various operations on them within the component. */
  tasks: Task[] = [];
  /* The line `filteredTasks: Task[] = [];` in the ListTasksComponent class is declaring a property
  named `filteredTasks` which is an array of objects of type `Task`. By initializing it with an
  empty array `[]`, it ensures that the `filteredTasks` property starts off as an empty array when
  an instance of ListTasksComponent is created. This property will be used to store a subset of
  tasks based on filtering criteria within the component. The `filteredTasks` array will be updated
  dynamically based on the filter applied by the user to display specific subsets of tasks, such as
  pending tasks, completed tasks, or all tasks. */
  filteredTasks: Task[] = [];

 /* The lines `totalTasks: number = 0;`, `pendingTasks: number = 0;`, and `completeTasks: number = 0;`
 in the `ListTasksComponent` class are declaring properties `totalTasks`, `pendingTasks`, and
 `completeTasks` respectively, each initialized with a value of `0`. */
  totalTasks: number = 0;
  pendingTasks: number = 0;
  completeTasks: number = 0;

  constructor(private taskService: TaskService) { }

 /**
  * The ngOnInit function calls the loadTasks method when the component is initialized.
  */
  ngOnInit(): void {
    this.loadTasks();
  }

 /**
  * The function calculates the total number of tasks, pending tasks, and completed tasks based on the
  * status of each task in the array.
  */
  calculateTasks(){ 
    this.totalTasks = this.tasks.length;
    this.pendingTasks = this.tasks.filter(task => !task.status).length;
    this.completeTasks = this.tasks.filter(task => task.status).length;
  }

/**
 * The `loadTasks` function retrieves tasks from a service, applies sorting, and calculates tasks.
 */
  loadTasks() {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
      this.applySort();
      this.filteredTasks = tasks;
      this.calculateTasks();
    });
  }

/**
 * The applyFilter function filters tasks based on the specified criteria and then calculates the
 * tasks.
 * @param {string} filter - The `filter` parameter in the `applyFilter` function is a string that
 * determines how the tasks should be filtered. It can have three possible values: 'all', 'pending', or
 * 'completed'. Based on the value of the `filter` parameter, the function filters the tasks
 * accordingly and then
 */
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

/**
 * The function `applySort` sorts an array of tasks first by status and then by creation date.
 */
  applySort() {
    this.tasks = this.tasks.sort((a, b) => {
      if (a.status !== b.status) {
        return a.status ? 1 : -1;
      }
      return new Date(b.created_at).getTime() - new Date(b.created_at).getTime();
    })
  }

 /**
  * The `deleteTask` function deletes a task by its ID and updates the task list accordingly.
  * @param {string} taskId - The `taskId` parameter in the `deleteTask` function is a string that
  * represents the unique identifier of the task that needs to be deleted. This identifier is used to
  * locate and remove the specific task from the list of tasks.
  */
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

/**
 * The function `updateTaskStatus` updates the status of a task in an array of tasks and applies
 * sorting and filtering operations.
 * @param {Task} updatedTask - The `updatedTask` parameter in the `updateTaskStatus` function
 * represents the task object that has been updated and needs to be reflected in the task list. This
 * object typically contains properties such as `id`, `title`, `description`, `status`, etc., with the
 * updated values.
 */
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
