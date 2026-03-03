const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// Load saved tasks
document.addEventListener("DOMContentLoaded", loadTasks);

addBtn.addEventListener("click", addTask);

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    createTaskElement(taskText);
    saveTask(taskText);

    taskInput.value = "";
}

function createTaskElement(taskText) {
    const li = document.createElement("li");
    li.textContent = taskText;

    // Toggle complete
    li.addEventListener("click", function() {
        li.classList.toggle("completed");
    });

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.addEventListener("click", function(e) {
        e.stopPropagation();
        li.remove();
        removeTask(taskText);
    });

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}

function saveTask(taskText) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => createTaskElement(task));
}

function removeTask(taskText) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task !== taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}