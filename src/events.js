import _ from 'lodash';

import { addNewTask } from './class';

import {
  saveTaskToLocal,
  tasks,
  removeAll,
  populateList,
  listContainer,
} from './index';

export const inputTask = document.querySelector('.input-tasks');
const clearTaskBtn = document.querySelector('.clear-btn');

export const changeState = (value) => {
  const checkBox = document.querySelectorAll('.checkbox');
  _.forEach(checkBox, (check, i) => {
    check.addEventListener('click', () => {
      value[i].completed = check.checked;
      saveTaskToLocal(value);
      const itemDesc = Array.from(
        document.querySelectorAll('.item-description'),
      );
      if (value[i].completed === check.checked) {
        itemDesc[i].classList.add('item-description-done');
      } else {
        itemDesc[i].classList.remove('item-description-done');
        itemDesc[i].contentEditable = 'true';
      }
    });
  });
};

inputTask.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    if (inputTask.value !== '') {
      addNewTask();
    }
  }
});

clearTaskBtn.addEventListener('click', () => {
  removeAll();
  listContainer.innerHTML = '';
  populateList(tasks);
  
  location.reload();
});