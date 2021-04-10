// TODO: replace by Date.now()
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

const COMPLETED = "COMPLETED";
const ALL = "ALL";
const ACTIVE = "ACTIVE";

class Todo {
  constructor(name) {
    this.name = name;
    this._isDone = false;
    this._id = getRandomIntInclusive(1, 10000);
  }

  get id() {
    return this._id;
  }

  set id(value) {
    this._id = value;
  }

  get isDone() {
    return this._isDone;
  }

  set isDone(value) {
    this._isDone = value;
  }

  toggle(isDone) {
    this.isDone = isDone;
  }
}

class TodoList {
  constructor() {
    this.list = []; // TODO: init by local storage data
  }

  getTodos() {
    return this.list;
  }

  getElementById(id) {
    return this.list.find((element) => {
      return element.id === id;
    });
  }

  addElement(element) {
    this.list.push(element);
    return this.list;
  }

  removeElement(id) {
    let temp = [];
    this.list.forEach((element) => {
      if (id != element.id) {
        temp.push(element);
      }
    });
    this.list = temp;
    return this.list;
  }

  filterByStatus(status) {
    let filteredArray = [];

    switch (status) {
      case ALL:
        return this.list;
      case COMPLETED:
        filteredArray = this.list.filter((element) => {
          return element.isDone === true;
        });
        return filteredArray;
      case ACTIVE:
        filteredArray = this.list.filter((element) => {
          return element.isDone === false;
        });
        return filteredArray;
      default:
        return this.list;
    }
  }

  removeByStatus(status) {
    let filteredArray = [];

    switch (status) {
      case ALL:
        this.list = [];
        return this.list;
      case COMPLETED:
        filteredArray = this.list.filter((element) => {
          return element.isDone !== true;
        });
        this.list = filteredArray;
        return this.list;
      case ACTIVE:
        filteredArray = this.list.filter((element) => {
          return element.isDone !== false;
        });
        this.list = filteredArray;
        return this.list;
      default:
        return this.list;
    }
  }
}
class View {
  constructor(ulTest) {
    this.ulTest = ulTest; //main list element
  }
  showTodo(obj) {
    let test = document.createElement("li");
    test.classList.add("li");
    test.innerHTML = obj.name;
    this.ulTest.appendChild(test);
    // result.appendChild(test);
  }
}

//==================================

// let todo = new Todo('item');
// console.log(todo);

// todo.toggle(true);
// console.log(todo);

// let todoList = new TodoList();
// console.log(todoList);

// let l = todoList.getElementById(454);
// console.log(l);

// console.log(todoList.addElement(todo));
// todo = new Todo('item2');
// console.log(todoList.addElement(todo));

// l = todoList.getElementById(todo.id);
// console.log(l);

// l.toggle(false);
// console.log(l);

// console.log(todoList);

// console.log(todoList.removeElement(todo.id));

// console.log(todoList.filterByStatus(ACTIVE));
// console.log(todoList.filterByStatus(ALL));
// console.log(todoList.filterByStatus(COMPLETED));

//console.log(todoList.removeByStatus(COMPLETED));

// console.log(todoList.getTodos());
