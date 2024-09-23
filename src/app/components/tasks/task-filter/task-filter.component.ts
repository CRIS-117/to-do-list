import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-task-filter',
  templateUrl: './task-filter.component.html',
  styleUrls: ['./task-filter.component.css']
})
export class TaskFilterComponent implements OnInit {

  @Output() filterChange = new EventEmitter<string>();
  isCollapsed = false;

  constructor() { }

  ngOnInit(): void {
  }

  setFilter(filter: string) : void {
    this.filterChange.emit(filter);
  }

}
