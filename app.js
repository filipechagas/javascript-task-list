class UI {
  constructor(){
    this.taskForm = document.querySelector("#new-task-form");
    this.taskName = document.getElementById("task-name");
    this.taskList = document.getElementById("task-list");
  }

  plugEventListeners(controller){
    this.taskForm.addEventListener('submit', controller.newTaskSubmit);
    this.taskList.addEventListener('click', controller.deleteTask);
  }

  addTaskToList(task){
    if(task === '') return;

    const li = document.createElement("li");
    li.innerHTML = `
      ${task}<a class="delete-task" href="">X</a>
    `;
    this.taskList.appendChild(li);
  }

  removeElement(e){
    e.remove();
  }

  clearInput(){
    this.taskName.value = '';
  }
}

class TasksController {
  constructor(ui){
    this.ui = ui;
    ui.plugEventListeners(this);
  }

  newTaskSubmit(e) {
    e.preventDefault();

    const taskName = ui.taskName.value;
    ui.addTaskToList(taskName);
    ui.clearInput();
  }

  deleteTask(e){
    e.preventDefault();

    if (e.target.className == 'delete-task'){
      const task = e.target.previousSibling.textContent;
      ui.removeElement(e.target.parentElement);
    }
  }
}

const ui = new UI();
const controller = new TasksController(ui);
