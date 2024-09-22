import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TaskCreatorPageComponent } from './task-creator-page/task-creator-page.component';
import { CompletedTasksComponent } from './completed-tasks/completed-tasks.component';
import { PendingTasksComponent } from './pending-tasks/pending-tasks.component';
import { TasksRoutingModule } from "./tasks-routing.module";

@NgModule({
  imports: [
    CommonModule,
    TasksRoutingModule,
  ],
  declarations: [
    TaskCreatorPageComponent,
    CompletedTasksComponent,
    PendingTasksComponent
  ],
  exports: [
    TaskCreatorPageComponent,
    CompletedTasksComponent,
    PendingTasksComponent
  ],
})
export class TasksModule { }