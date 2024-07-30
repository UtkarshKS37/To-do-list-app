//retrieve todo from local storage orinitialize an empty array
//we create a variable todo
let todo = JSON.parse(localStorage.getItem("todo")) || [];
//variable todo=go get the item todo from local storage, or if that doesn't exist then todo is just and empty array

//referencing different elements (from HTML) we need for the js to function, like creating clones from there to use here
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const todoCount = document.getElementById("todoCount");
const addButton = document.querySelector(".btn"); //querySelector to target a class
const deleteButton = document.getElementById("deleteButton");

//Initialize
document.addEventListener("DOMContentLoaded", function() {
    addButton.addEventListener("click", addTask);
    todoInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            addTask;
        }
    });
    deleteButton.addEventListener("click", deleteAllTasks);
    displayTasks();
});
//function() defines a funtion

//= is setting to, === is measuring or equal to, !== not equal to
function addTask() {
    const newTask = todoInput.value.trim();
    if (newTask !== "") {
        todo.push({
            text: newTask, disabled: false
    });
    saveToLocalStorage();
    todoInput.value = "";
    displayTasks();
    }
}

function deleteAllTasks() {
    console.log("test");
}

function displayTasks() {
    todoList.innerHTML = "";
    todo.forEach((item, index) => {
        const p = document.createElement("p");
        p.innerHTML = `
        <div class="todo-container">
            <input type="checkbox" class="todo-checkbox" id="input-${index}" ${item.disabled ? "checked": ""}>
            <p id="todo-${index}" class="${item.disabled ? "disabled": ""}" onclick="editTask(${index})">
            ${item.text}
            </p>
        </div>
        `;
        p.querySelector(".todo-checkbox").addEventListener("change", () => {
            toggleTask(index);
        });
        todoList.appendChild(p);
    });
    todoCount.textContent = todo.length;
}
//`` in js is used to define an HTML code
//using innerHTML we can use HTML inside a js code
//${} contains js elements inside a HTML code
//item.disabled ? is way of asking is this true? If true, gets checked, if not, empty.

function editTask(index) {
    const todoItem = document.getElementById(`todo-${index}`);
    const existingText = todo[index].text;
    const inputElement = document.createElement("input");

    inputElement.value = existingText;
    todoItem.replaceWith(inputElement);
    inputElement.focus();

    inputElement.addEventListener("blur", function () {
        const updatedText = inputElement.value.trim();
        if (updatedText) {
            todo[index].text = updatedText;
            saveToLocalStorage();
        }
        displayTasks();
    });
}

function toggleTask(index) {
    todo[index].disabled = !todo[index].disabled;
    saveToLocalStorage();
    displayTasks();
}

function deleteAllTasks() {
    todo = [];
    saveToLocalStorage();
    displayTasks();
}

function saveToLocalStorage() {
    localStorage.setItem("todo", JSON.stringify(todo));
}