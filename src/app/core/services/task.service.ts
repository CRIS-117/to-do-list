import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { Task } from '../models/tasks/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) { }

/**
 * The function `getTasks` retrieves tasks from an API, sorts them first by status and then by creation
 * date in descending order.
 * @returns An Observable of Task array is being returned. The tasks are fetched from the API endpoint
 * specified by `this.apiUrl`, then sorted based on their status and creation date before being emitted
 * by the Observable.
 */
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl).pipe(
      map(tasks => {
        return tasks.sort((a, b) => {
          if (a.status !== b.status) {
            return a.status ? 1 : -1;
          }
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        });
      })
    );
  }

 /**
  * The function `createTask` sends a POST request to a specified API endpoint with a new task object
  * and returns an Observable of the created task.
  * @param {Task} newTask - The `newTask` parameter in the `createTask` function represents a new task
  * object that you want to add to the task list. This object typically contains information about the
  * task such as its title, description, due date, priority, etc. When you call the `createTask`
  * function and
  * @returns An Observable of type Task is being returned.
  */
  createTask(newTask: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, newTask);
  }

  /**
   * The function `deleteTask` sends a DELETE request to the specified task ID endpoint.
   * @param {string} taskId - The `deleteTask` function takes a `taskId` parameter of type string,
   * which represents the unique identifier of the task that needs to be deleted. The function then
   * constructs a URL using the `apiUrl` property and the `taskId`, and sends a DELETE request to that
   * URL using Angular's HttpClient
   * @returns An Observable of void is being returned.
   */
  deleteTask(taskId: string): Observable<void>{
    const url = `${this.apiUrl}/${taskId}`
    return this.http.delete<void>(url);
  }

  /**
   * The function `updateTask` sends an HTTP PUT request to update a task with the provided data.
   * @param {Task} updatedTask - The `updatedTask` parameter in the `updateTask` function represents
   * the task object that you want to update. This task object should contain the updated information
   * that you want to save to the server. The function sends a PUT request to the server with the
   * updated task object to update the task with the
   * @returns The `updateTask` function is returning an Observable of type `Task`. It sends an HTTP PUT
   * request to update a task with the provided `updatedTask` object and returns the updated task as an
   * Observable.
   */
  updateTask(updatedTask: Task): Observable<Task>{
    return this.http.put<Task>(`${this.apiUrl}/${updatedTask.id}`, updatedTask)
  }

/**
 * The function `getNextId` returns an Observable that emits the next available ID based on the
 * existing tasks.
 * @returns An Observable of type string is being returned.
 */
  getNextId(): Observable<string> {
    return this.getTasks().pipe(
      map(tasks => {
        const maxId = tasks.length > 0 ? Math.max(...tasks.map(task => parseInt(task.id))) : 0;
        const id = maxId + 1
        return id.toString();
      })
    );
  }
  
}
