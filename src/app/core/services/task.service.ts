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

  createTask(newTask: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, newTask);
  }

  deleteTask(taskId: string): Observable<void>{
    const url = `${this.apiUrl}/${taskId}`
    return this.http.delete<void>(url);
  }

  updateTask(updatedTask: Task): Observable<Task>{
    return this.http.put<Task>(`${this.apiUrl}/${updatedTask.id}`, updatedTask)
  }

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
