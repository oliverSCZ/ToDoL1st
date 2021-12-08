export default function changeState(value) {
  const checkBox = document.querySelectorAll('.checkbox');
  checkBox.forEach((check, i) => {
    check.addEventListener('click', () => {
      value[i].completed = check.checked;
      localStorage.setItem('task', JSON.stringify(value));
    });
  });
}