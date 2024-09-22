import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCreatorPageComponent } from './task-creator-page.component';

describe('TaskCreatorPageComponent', () => {
  let component: TaskCreatorPageComponent;
  let fixture: ComponentFixture<TaskCreatorPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskCreatorPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskCreatorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
