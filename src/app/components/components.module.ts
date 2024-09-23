import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms'; 

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox'; 
import { NzMenuModule } from 'ng-zorro-antd/menu';

import { TaskFormComponent } from './tasks/task-form/task-form.component';
import { TaskCardComponent } from './tasks/task-card/task-card.component';
import { TaskFilterComponent } from './tasks/task-filter/task-filter.component';



@NgModule({
  declarations: [
    TaskFormComponent,
    TaskCardComponent,
    TaskFilterComponent
  ],
  imports: [
    CommonModule,    
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzSelectModule,
    NzDatePickerModule,
    NzAlertModule,
    NzCardModule, 
    NzCheckboxModule,
    NzIconModule,
    NzMenuModule,
    FormsModule
  ],
  exports: [
    TaskFormComponent,
    TaskCardComponent,
    TaskFilterComponent
  ] 
})
export class ComponentsModule { }
