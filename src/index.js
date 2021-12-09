import _ from 'lodash';
import './style.css';
// eslint-disable-next-line
import { changeState } from './events.js';

export const listContainer = document.querySelector('.list');

const tasks = [];
export { tasks };

export const saveTaskToLocal = (value) => {
  localStorage.setItem('task', JSON.stringify(value));
};

const getTaskFromLocal = () => {
  const dataFromLocal = JSON.parse(localStorage.getItem('task'));
  if (dataFromLocal) {
    _.forEach(dataFromLocal, (data, i) => {
      data.index = i + 1;
      tasks.push(data);
    });
  }
};

getTaskFromLocal();

const updateTasks = (data) => {
  tasks = data;
};

export const removeAll = () => {
  updateTasks(tasks.filter((task) => task.completed === false));
  tasks.forEach((task, i) => {
    task.index = i + 1;
  });
  saveTaskToLocal(tasks);
};

export const populateList = (values) => {
  const sortedTasks = _.sortBy(values, 'index');
  _.forEach(sortedTasks, (toDo) => {
    const htmlText = `
    <li class='item'>
      <input type='checkbox' class='checkbox' id='${toDo.description[0]}${
  toDo.index
}' ${toDo.completed ? 'checked' : ''}/>
      <div class="inside-div">
        <span contentEditable='true' class='item-description ${
  toDo.completed ? 'item-description-done' : ''
}'>${
  toDo.description
}<ion-icon name="trash-outline" class="display-icon trash-icon"></ion-icon></span>
        <ion-icon name='ellipsis-vertical-outline' class='dynamic-icons'></ion-icon>    
      </div>
    </li>`;

    listContainer.insertAdjacentHTML('beforeend', htmlText);
  });
};

populateList(tasks);
changeState(tasks);

const taskIcon = Array.from(document.querySelectorAll('.dynamic-icons'));
const trashIcons = [...document.querySelectorAll('.trash-icon')];
const textDescription = [...document.querySelectorAll('.item-description')];
const liItem = [...document.querySelectorAll('.item')];

_.forEach(liItem, (item, i) => {
  textDescription[i].addEventListener('focus', () => {
    item.style.backgroundColor = 'rgba(248, 244, 2, 0.322)';
    taskIcon[i].classList.add('display-icon');
    trashIcons[i].classList.remove('display-icon');
    trashIcons[i].addEventListener('click', () => {
      tasks.splice(tasks.indexOf(tasks[i]), 1);
      tasks.forEach((task, i) => {
        task.index = i + 1;
      });
      saveTaskToLocal(tasks);
      listContainer.innerHTML = '';
      populateList(tasks);
      location.reload();
    });
  });

  textDescription[i].addEventListener('focusout', () => {
    item.style.backgroundColor = '#fff';
    taskIcon[i].classList.remove('display-icon');
    trashIcons[i].classList.add('display-icon');
  });
});