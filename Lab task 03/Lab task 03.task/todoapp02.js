const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const clearAll = document.getElementById("clearAll");
const filterButtons = document.querySelectorAll(".filters button");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

// Add Task
function addTask() {
    const text = taskInput.value.trim();
    if (text === "") return;

    tasks.push({ text, completed: false });
    taskInput.value = "";
    saveTasks();
    renderTasks();
}

// Render Tasks
function renderTasks() {
    taskList.innerHTML = "";

    const filteredTasks = tasks.filter(task => {
        if (currentFilter === "active") return !task.completed;
        if (currentFilter === "completed") return task.completed;
        return true;
    });

    filteredTasks.forEach((task, index) => {
        const li = document.createElement("li");
        if (task.completed) li.classList.add("completed");

        const span = document.createElement("span");
        span.textContent = task.text;
        span.onclick = () => toggleComplete(index);

        const btnDiv = document.createElement("div");
        btnDiv.classList.add("task-buttons");

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.onclick = () => editTask(index);

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = () => deleteTask(index);

        btnDiv.append(editBtn, deleteBtn);
        li.append(span, btnDiv);
        taskList.appendChild(li);
    });

    taskCount.textContent = `${tasks.length} tasks`;
}

// Toggle Complete
function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

// Delete Task
function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

// Edit Task
function editTask(index) {
    const newText = prompt("Edit your task:", tasks[index].text);
    if (newText !== null) {
        tasks[index].text = newText.trim();
        saveTasks();
        renderTasks();
    }
}

// Clear All
clearAll.onclick = () => {
    tasks = [];
    saveTasks();
    renderTasks();
};

// Filter
filterButtons.forEach(btn => {
    btn.onclick = () => {
        document.querySelector(".filters .active").classList.remove("active");
        btn.classList.add("active");
        currentFilter = btn.dataset.filter;
        renderTasks();
    };
});

// Save to Local Storage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Events
addBtn.onclick = addTask;
taskInput.addEventListener("keypress", e => {
    if (e.key === "Enter") addTask();
});

// Initial Render
renderTasks();