
import { saveTaskToLocal, tasks } from './index.js';

import { inputTask } from './events.js';

class Task {
  constructor(description, completed = false, index) {
    this.description = description;
    this.completed = completed;
    this.index = index;
  }
}

export const addNewTask = () => {
  const newTask = new Task(inputTask.value);
  if (tasks.length === 0) newTask.index = 1;
  if (tasks.length > 0) newTask.index = tasks.length + 1;
  tasks.push(newTask);
  saveTaskToLocal(tasks);
  inputTask.value = '';
 
  location.reload();
};