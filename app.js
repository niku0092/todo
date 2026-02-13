const STORAGE_KEY = 'todos';
const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const emptyMessage = document.getElementById('empty-message');

function loadTodos() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function saveTodos(todos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function renderTodos(todos) {
  list.innerHTML = '';
  emptyMessage.hidden = todos.length > 0;

  todos.forEach((todo) => {
    const li = document.createElement('li');
    li.className = 'todo-item' + (todo.completed ? ' completed' : '');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.addEventListener('change', () => toggleTodo(todo.id));

    const title = document.createElement('span');
    title.className = 'todo-title';
    title.textContent = todo.title;

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = '削除';
    deleteBtn.addEventListener('click', () => deleteTodo(todo.id));

    li.append(checkbox, title, deleteBtn);
    list.appendChild(li);
  });
}

function addTodo(titleText) {
  const todos = loadTodos();
  todos.push({
    id: Date.now().toString(),
    title: titleText,
    completed: false,
  });
  saveTodos(todos);
  renderTodos(todos);
}

function toggleTodo(id) {
  const todos = loadTodos();
  const todo = todos.find((t) => t.id === id);
  if (todo) todo.completed = !todo.completed;
  saveTodos(todos);
  renderTodos(todos);
}

function deleteTodo(id) {
  const todos = loadTodos().filter((t) => t.id !== id);
  saveTodos(todos);
  renderTodos(todos);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = input.value.trim();
  if (!title) return;
  input.value = '';
  addTodo(title);
});

renderTodos(loadTodos());
