const form = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoDate = document.getElementById("todo-date");
const todoList = document.getElementById("todo-list");
const filter = document.getElementById("filter");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

document.addEventListener("DOMContentLoaded", renderTodos);
form.addEventListener("submit", addTodo);
todoList.addEventListener("click", handleClick);
filter.addEventListener("change", filterTodos);

function addTodo(e) {
  e.preventDefault();

  const text = todoInput.value.trim();
  const date = todoDate.value;

  if (!text || !date) {
    alert("Please fill in both fields!");
    return;
  }

  const newTodo = {
    id: Date.now(),
    text,
    date,
    completed: false,
  };

  todos.push(newTodo);
  saveToLocalStorage();
  renderTodos();

  todoInput.value = "";
  todoDate.value = "";
}

function handleClick(e) {
  const target = e.target;
  const id = target.closest("li").dataset.id;

  if (target.classList.contains("delete-btn")) {
    todos = todos.filter(todo => todo.id != id);
  } else if (target.classList.contains("complete-btn")) {
    const todo = todos.find(todo => todo.id == id);
    todo.completed = !todo.completed;
  }

  saveToLocalStorage();
  renderTodos();
}

function filterTodos() {
  renderTodos(filter.value);
}

function renderTodos(filterValue = "all") {
  todoList.innerHTML = "";

  todos.forEach(todo => {
    const shouldShow =
      filterValue === "all" ||
      (filterValue === "completed" && todo.completed) ||
      (filterValue === "pending" && !todo.completed);

    if (!shouldShow) return;

    const li = document.createElement("li");
    li.dataset.id = todo.id;
    li.classList.toggle("completed", todo.completed);
    li.innerHTML = `
      <span>${todo.text} - ${todo.date}</span>
      <div>
        <button class="complete-btn">✔</button>
        <button class="delete-btn">✖</button>
      </div>
    `;
    todoList.appendChild(li);
  });
}

function saveToLocalStorage() {
  localStorage.setItem("todos", JSON.stringify(todos));
}
