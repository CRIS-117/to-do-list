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

/* The code snippet you provided is from a TypeScript file for an Angular component called
`TaskFormComponent`. In this component, the following properties are declared: */
  taskForm: FormGroup;
  taskSuccess = false;
  taskError = false; 

/* The `@Output() taskCreated = new EventEmitter<Task>();` line in the `TaskFormComponent` class is
creating an output property named `taskCreated` of type `EventEmitter`. */
  @Output() taskCreated = new EventEmitter<Task>();

 /**
  * The constructor initializes a form group with title and description fields using FormBuilder in
  * TypeScript.
  * @param {FormBuilder} fb - FormBuilder, which is a service provided by Angular for creating form
  * controls and groups in reactive forms.
  * @param {TaskService} taskService - The `taskService` parameter in the constructor is an instance of
  * the `TaskService` class. It is being injected into the constructor using dependency injection. This
  * allows the component to use the methods and properties provided by the `TaskService` class to
  * interact with tasks or perform any necessary operations related to
  */
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

/**
 * The function `markAllFieldAsDirty` iterates through all controls in a form and marks them as dirty.
 */
  markAllFieldAsDirty(): void {
    for(const i in this.taskForm.controls){
      if(this.taskForm.controls.hasOwnProperty(i)){
        this.taskForm.controls[i].markAsDirty();
        this.taskForm.controls[i].updateValueAndValidity();
      }
    }
  }

/**
 * The submitForm function creates a new task with user input data and handles success or error
 * responses when submitting the form.
 */
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
