const input = document.querySelector("#input");
const addBtn = document.querySelector("#addBtn");
const todoListContainer = document.querySelector("#todo-list-container");
const total = document.querySelector("#total");
const li = document.querySelector(".li");

let i = 0; // number of todos

const view = new View(todoListContainer);

let test = new TodoList();

function createTodoDOMElement(todo) {}

// обработка нажатия кнопки add
addBtn.addEventListener("click", (e) => {
  //update data structures
  let testTodo = new Todo(input.value);
  test.addElement(testTodo);

  // todoList.addElement()
  console.log(e);
  console.log(test.getTodos());

  //create todo item DOM element
  let todoDOMElement = document.createElement("li");
  todoDOMElement.className = "li";
  todoDOMElement.id = testTodo.id;
  todoDOMElement.textContent = testTodo.name;

  //reset input
  input.value = "";

  // delete todo from todoList by pressing del button
  // console.log(e); после нажатия кнопки удалить задачу в окне браузера
  // смотрим mouse events / target / path / parent node
  let delBtnDOMElement = document.createElement("button"); // создаем кнопку удалить в конце задачи
  delBtnDOMElement.className = "btn-delete-todo"; // присваиваем кнопке класс
  delBtnDOMElement.textContent = "Del"; // надпись на кнопке

  delBtnDOMElement.addEventListener("click", (e) => {
    // delete todo from todoList by pressing del button

    if (confirm("Are you sure?")) {
      // окно подтверждения на удаление
      let id = parseInt(e.target.parentElement.id); // получаем id родительского элемента
      test.removeElement(id); // remove from data
      document.getElementById(id).remove(); // remove from html
    }
  });

  todoDOMElement.appendChild(delBtnDOMElement); // add button to list element

  //====================================
  // toggle class completed
  todoDOMElement.addEventListener("click", (e) => {
    console.log(e);
    e.target.classList.toggle("li-completed");

    let id = parseInt(e.target.id, 10);
    let todo = test.getElementById(id);
    todo.toggle(!todo.isDone);
  });
  //====================================

  //add todo item DOM element (with events attached) in to todo list DOM element
  todoListContainer.appendChild(todoDOMElement);
});

function toggleTodosVisibility(visibleTodosIds) {
  test.getTodos().forEach((todo) => {
    let el = document.getElementById(todo.id);
    if (!visibleTodosIds.includes(todo.id)) {
      el.classList.add("hidden");
    } else {
      el.classList.remove("hidden");
    }
  });
}

// обработка нажатия кнопки Completed
document.querySelector(".completedBtn").addEventListener("click", (e) => {
  let visibleTodosIds = test.filterByStatus(COMPLETED).map((item) => item.id);
  toggleTodosVisibility(visibleTodosIds);

  //   console.log(test);
  console.log("Completed button was pushed");
});

// обработка нажатия кнопки Active
document.querySelector(".activeBtn").addEventListener("click", (e) => {
  let visibleTodosIds = test.filterByStatus(ACTIVE).map((item) => item.id);

  toggleTodosVisibility(visibleTodosIds);
  //   console.log(test);
  console.log("Active button was pushed");
});

// обработка нажатия кнопки All
document.querySelector(".allBtn").addEventListener("click", (e) => {
  let visibleTodosIds = test.filterByStatus(ALL).map((item) => item.id);

  toggleTodosVisibility(visibleTodosIds);
  // console.log(test);
  console.log("All button was pushed");
});

// обработка нажатия кнопки Clear All
// используем querySelector с классом .clearAllBtn, поэтому точно знаем какая кнопка была нажата
document.querySelector(".clearAllBtn").addEventListener("click", (e) => {
  if (confirm("Are you sure?")) {
    // confirmation window for deleting todos
    toggleTodosVisibility([]);
  }

  console.log("Clear All button was pushed");
});

//   test

//   let myTodoList = []; // empty array to save my tasks

// if (localStorage.getItem('todo') != undefined) {
//   myTodoList = JSON.parse(localStorage.getItem('todo')); // transform array to JSON string
//   // out();
// }

// create and delete todo
function createDeleteElements(value) {
  i++;
  // console.log(value);

  const li = document.createElement("li");
  const addBtn = document.createElement("button");

  li.className = "li";
  li.textContent = value;

  addBtn.className = "delBtn";
  addBtn.textContent = "Del";
  li.appendChild(addBtn); // add button to list element

  // remove todo
  addBtn.addEventListener("click", (e) => {
    confirm("Do you really want to delete it?");
    i--;
    total.textContent = i;
    result.removeChild(li);
  });

  // toggle class completed
  li.addEventListener("click", (e) => {
    li.classList.toggle("li-completed");
  });

  total.textContent = i;

  todoListContainer.appendChild(li);
}

// const completed = document.querySelector('#completed');

// // filter completed todos
// completed.addEventListener('click', (e) => {
//   const li = document.createElement('li');
//   result.removeChild(li);
// })

let todoList = []; // empty array to save my tasks

if (localStorage.getItem("todo") != undefined) {
  todoList = JSON.parse(localStorage.getItem("todo")); // transform array to JSON string
  out();
}

// document.getElementById('addBtn').onclick = function () {
//   let d = document.getElementById('input').value; // get value from input field
//   debugger
//   let temp = {};
//   temp.todo = d; // add todo that was read from input field
//   temp.check = false;
//   let i = todoList.length;
//   todoList[i] = temp;
//   console.log(todoList);
//   out();

//   localStorage.setItem('todo', JSON.stringify(todoList)); // transform JSON string to array
// }

function out() {
  let out = "";
  for (var key in todoList) {
    //   if (todoList[key].check === true) {
    //     out += '<input type="checkbox" checked>';
    //   } else {
    out += '<input type="checkbox">';
    // }
    out += todoList[key].todo + "<br>";
  }
  // document.getElementById('out').innerHTML = out; // запись списка дел в выходной див

  document.getElementById("result").innerHTML = out; // запись списка дел в выходной див
}

// // clear input field
// clean() {
//   if (input.value === '') return;
//   input.value = '';
//}
