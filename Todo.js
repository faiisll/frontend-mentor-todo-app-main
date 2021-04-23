class Todo {
  constructor(todos = []) {
    this.todos = localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos"))
      : todos;
  }

  renderToHtml(datas) {
    let string = "";

    if (datas.length) {
      datas.map((todo) => {
        string += `<div class="todo-item ${
          todo.isCompleted ? "completed" : ""
        }">
                <div class="left" onclick=(checkTodo(${todo.id}))>
                  <div class="circle">
                  ${
                    todo.isCompleted
                      ? '<img src="./images/icon-check.svg" alt="">'
                      : ""
                  }
                  </div>
                  <p class="todo-text">${todo.task}</p>
                </div>
                <img onclick=(removeTodo(${
                  todo.id
                })) src="./images/icon-cross.svg" width="12px" height="12px"/>
                </div>`;
      });
    } else {
      string = `<div class="todo-item">
        <div class="left">
          <p class="todo-text">No Task!</p>
        </div></div>`;
    }
    todoContainer.innerHTML = string;
  }

  modifyLocal() {
    localStorage.setItem("todos", JSON.stringify(this.todos));
  }

  addTodo(task) {
    const todo = {
      id: Math.random(),
      task,
      isCompleted: false,
    };
    this.todos = this.todos.length > 0 ? [todo, ...this.todos] : [todo];
    this.modifyLocal();
  }

  removeTodo(id) {
    if (id) this.todos = this.todos.filter((todo) => todo.id !== id);

    this.renderToHtml(this.todos);
    this.modifyLocal();
  }

  checkTodo(id) {
    this.todos.map((todo) => {
      if (todo.id === id) todo.isCompleted = !todo.isCompleted;
    });

    this.modifyLocal();

    this.renderToHtml(this.todos);
  }

}
