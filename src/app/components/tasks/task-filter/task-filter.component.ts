import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-task-filter',
  templateUrl: './task-filter.component.html',
  styleUrls: ['./task-filter.component.css']
})
export class TaskFilterComponent implements OnInit {

  /* The `@Output() filterChange = new EventEmitter<string>();` line in the code snippet is creating an
  output property named `filterChange` of type `EventEmitter<string>`. This output property can be
  used to emit events from the `TaskFilterComponent` component to its parent component. */
  @Output() filterChange = new EventEmitter<string>();
  
 /* The `isCollapsed = false;` line in the code snippet is initializing a boolean property named
 `isCollapsed` with a value of `false`. This property can be used to keep track of the collapsed
 state of a component or element in the `TaskFilterComponent` class. It is commonly used in user
 interfaces to toggle the visibility or expand/collapse sections based on the value of this
 property. */
  isCollapsed = false;

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * The `setFilter` function emits a filter change event with the specified filter string.
   * @param {string} filter - The `filter` parameter is a string that represents the filter value that
   * will be emitted using the `filterChange` event emitter.
   */
  setFilter(filter: string) : void {
    this.filterChange.emit(filter);
  }

}
