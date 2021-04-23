const themeBtn = document.querySelector(".theme-btn");
const bg = document.querySelector(".bg");
const todoContainer = document.querySelector(".todo-container");
const todoInput = document.querySelector(".todo-input");
const totalTodo = document.querySelector(".total-todo");
themeBtn.addEventListener("click", changeTheme);
const body = document.body;


const todo1 = new Todo();

setTimeout(() => {
    todo1.renderToHtml(todo1.todos);
    totalItems();
}, 0);
todoInput.addEventListener('keypress', (e) => {
  if(e.key === 'Enter' && e.target.value.length > 0){
    todo1.addTodo(e.target.value);
    e.target.value = "";
    todo1.renderToHtml(todo1.todos);

    totalItems();
    filterData(filterState);
  }
})

function removeTodo(id){
  todo1.removeTodo(id);
  totalItems();
  filterData(filterState);
}

function clearCompleted(){
  todo1.todos = todo1.todos.filter(todo => !todo.isCompleted);
  todo1.renderToHtml(todo1.todos);
  todo1.modifyLocal();
  filterData(filterState);
}

function checkTodo(id){
  todo1.checkTodo(id);
  totalItems();
  filterData(filterState);
}

function totalItems(){
  
  if(!todo1.todos.length){
    totalTodo.innerHTML = '0 items left';
  }else{
    let total = todo1.todos.filter( todo => !todo.isCompleted );
    totalTodo.innerHTML = `${total.length} items left`;
  }
}



//filter function
const filters = document.querySelectorAll(".filter-item");
let filterState = "all";
filters.forEach((filter) => {
  filter.addEventListener("click", (e) => {
    clearActive(filters);
    filterState = e.target.innerHTML;
    activateFilter();
    
    filterData(filterState);

  });
});

function filterData(status){
  switch(status){
    case "All":
      todo1.renderToHtml(todo1.todos);
      return 0;
    case "Active":
      todo1.renderToHtml(todo1.todos.filter( todo => !todo.isCompleted));
      return 0;
    case "Completed":
      todo1.renderToHtml(todo1.todos.filter( todo => todo.isCompleted));
      return 0;
    default:
      return 0;
  }
}


function activateFilter() {
  filters.forEach((filter) => {
    if (filter.innerHTML === filterState) {
      filter.classList.add("active");
    }
  });
}

function clearActive(items) {
  items.forEach((item) => item.classList.remove("active"));
}


//theme function
function changeTheme() {
  body.classList.toggle("dark-theme");

  if (body.classList.contains("dark-theme")) {
    bg.src = "./images/bg-mobile-dark.jpg";
    themeBtn.innerHTML = `<img width="20px" src="./images/icon-sun.svg" alt="">`;
    localStorage.setItem("theme", "dark");
  } else {
    bg.src = "./images/bg-mobile-light.jpg";
    themeBtn.innerHTML = `<img width="20px" src="./images/icon-moon.svg" alt="">`;
    localStorage.setItem("theme", "light");
  }
}

setTimeout(() => {
  const theme = localStorage.getItem("theme");

  if (theme === "dark") {
    body.classList.add("dark-theme");
    bg.src = "./images/bg-mobile-dark.jpg";
    themeBtn.innerHTML = `<img width="20px" src="./images/icon-sun.svg" alt="">`;
  } else {
    bg.src = "./images/bg-mobile-light.jpg";
    themeBtn.innerHTML = `<img width="20px" src="./images/icon-moon.svg" alt="">`;
  }
}, 0);