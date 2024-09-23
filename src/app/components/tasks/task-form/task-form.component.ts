import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { TaskService } from 'src/app/core/services/task.service';
import { Task } from 'src/app/core/models/tasks/task.model';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {

  taskForm: FormGroup;
  taskSuccess = false;
  taskError = false; 

  @Output() taskCreated = new EventEmitter<Task>();

  constructor(
    private fb: FormBuilder, 
    private taskService: TaskService,
  ) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
  }

  ngOnInit(): void { }

  markAllFieldAsDirty(): void {
    for(const i in this.taskForm.controls){
      if(this.taskForm.controls.hasOwnProperty(i)){
        this.taskForm.controls[i].markAsDirty();
        this.taskForm.controls[i].updateValueAndValidity();
      }
    }
  }

  submitForm(): void {
    if (this.taskForm.valid) {
      this.taskService.getNextId().subscribe(nextId => {
        const newTask: Task = {
          id: nextId,
          title: this.taskForm.value.title,
          description: this.taskForm.value.description,
          status: false,
          created_at: new Date().toISOString(),
          updated_at: null,
        };

        this.taskService.createTask(newTask).subscribe({
          next: () => {
            this.taskCreated.emit(newTask);
            this.taskSuccess = true;
            this.taskError = false;
            this.taskForm.reset();

            setTimeout(() => {
              this.taskSuccess = false;
            }, 3000);
          },
          error: () => {
            this.taskError = true;  
            this.taskSuccess = false;

            setTimeout(() => {
              this.taskError = false;
            }, 3000);
          }
        });
      });
    } else {
      this.markAllFieldAsDirty();
    }
  }

}
