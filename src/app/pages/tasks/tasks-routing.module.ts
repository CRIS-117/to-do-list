import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskCreatorPageComponent } from './task-creator-page/task-creator-page.component';
import { CompletedTasksComponent } from './completed-tasks/completed-tasks.component';
import { PendingTasksComponent } from './pending-tasks/pending-tasks.component';

const routes: Routes = [
  { path: 'created', component: TaskCreatorPageComponent },
  { path: 'completed', component: CompletedTasksComponent },
  { path: 'pending', component: PendingTasksComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
