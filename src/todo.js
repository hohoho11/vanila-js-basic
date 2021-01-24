const todoForm = document.querySelector(".js-todoForm"),
    todoInput = todoForm.querySelector("input"),
    todoList = document.querySelector(".todo-list");

const TODO_LS = "todo";

let todoArr = [];

function deleteTodo(e) {
    // const idx =  todoArr.findIndex(function(val) {
    //     return val.id === parseInt(e.target.parentNode.id)
    // });
    // todoArr.splice(idx,1);
    const cleanTodo = todoArr.filter(function(todo) {
        return todo.id !== parseInt(e.target.parentNode.id);
    })
    todoArr = cleanTodo;
    todoList.removeChild(e.target.parentNode)
    saveTodo();
}

function saveTodo() {
    localStorage.setItem(TODO_LS,JSON.stringify(todoArr));
}

function paintTodo(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    delBtn.innerText = "❌"
    delBtn.addEventListener("click",deleteTodo);
    const span = document.createElement("span");
    const newId = todoArr.length+1;
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;
    todoList.appendChild(li);
    const todoObj = {
        text : text,
        id : newId
    }
    todoArr.push(todoObj);
    saveTodo(todoArr);
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = todoInput.value;
    paintTodo(currentValue);
    todoInput.value = "";
}

function loadTodo() {
    const todo = localStorage.getItem(TODO_LS);
    if(todo !== null) {
        const parsedTodo = JSON.parse(todo);
        parsedTodo.forEach(function(todo) {
            paintTodo(todo.text)
        })
    }
}

function init() {
    loadTodo();
    todoForm.addEventListener("submit",handleSubmit);
    console.log(todoArr)
}

init();