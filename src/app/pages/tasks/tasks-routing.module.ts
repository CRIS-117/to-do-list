import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskCreatorPageComponent } from './task-creator-page/task-creator-page.component';
import { ListTasksComponent } from './list-tasks/list-tasks.component';

const routes: Routes = [
  { path: 'created', component: TaskCreatorPageComponent },
  { path: 'list', component: ListTasksComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
