import './style.css';
import changeState from './markStatus';

const listContainer = document.querySelector('.list');

const tasks = [
  {
    description: 'to do housework',
    completed: false,
    index: 1,
  },
  {
    description: 'go to gym',
    completed: false,
    index: 2,
  },
  {
    description: 'finish Microverse Project',
    completed: false,
    index: 3,
  },
];

const saveTaskToLocal = (value) => {
  localStorage.setItem('task', JSON.stringify(value));
};

saveTaskToLocal(tasks);

const getTaskFromLocal = () => JSON.parse(localStorage.getItem('task'));

const populateList = (values) => {
  values.forEach((toDo, i) => {
    const htmlText = `
      <li class='item'>     
        <input type='checkbox' class='${toDo.completed} checkbox' id='${toDo.description[0]}${toDo.index}' />
        <label for='${toDo.description[0]}${toDo.index}' class='item-description'>${toDo.description}</label> 
        <ion-icon name='ellipsis-vertical-outline' class='dynamic-icons'></ion-icon>
      </li>`;

    if (i + 1 === toDo.index) listContainer.innerHTML += htmlText;
  });
};

populateList(getTaskFromLocal());
changeState(getTaskFromLocal());