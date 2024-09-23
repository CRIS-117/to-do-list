import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TaskCreatorPageComponent } from './task-creator-page/task-creator-page.component';
import { TasksRoutingModule } from "./tasks-routing.module";
import { ComponentsModule } from '../../components/components.module';
import { ListTasksComponent } from './list-tasks/list-tasks.component'; 

@NgModule({
  imports: [
    CommonModule,
    TasksRoutingModule,
    ComponentsModule
  ],
  declarations: [
    TaskCreatorPageComponent,
    ListTasksComponent
  ],
  exports: [
    TaskCreatorPageComponent,
  ],
})
export class TasksModule { }