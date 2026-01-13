const newTaskInput = document.querySelector("#new-task-input");
const addTaskButton = document.querySelector("#add-task-button");
const tasklist = document.querySelector("#tasklist");

// --- Cargar tareas guardadas desde LocalStorage al iniciar ---
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

tasks.forEach(task => {
    addTaskToDOM(task.text, task.completed);
});

// --- Función para agregar tareas al DOM ---
function addTaskToDOM(taskText, completed = false) {
    const li = document.createElement("li");

    // Checkbox para marcar como completado
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = completed;
    li.appendChild(checkbox);

    // Texto de la tarea
    const span = document.createElement("span");
    span.textContent = taskText;
    if (completed) span.style.textDecoration = "line-through"; // tachado si ya estaba completada
    li.appendChild(span);

    // Botón eliminar
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Eliminar";
    li.appendChild(deleteButton);

    // Evento para marcar como completada
    checkbox.addEventListener("change", () => {
        span.style.textDecoration = checkbox.checked ? "line-through" : "none";
        updateTaskStatus(taskText, checkbox.checked);
    });

    // Evento para eliminar tarea
    deleteButton.addEventListener("click", () => {
        tasklist.removeChild(li);
        removeTaskFromStorage(taskText);
    });

    tasklist.appendChild(li);
}

// --- Agregar nueva tarea ---
addTaskButton.addEventListener("click", () => {
    const taskText = newTaskInput.value.trim();
    if (!taskText) return;

    addTaskToDOM(taskText);

    tasks.push({ text: taskText, completed: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));

    newTaskInput.value = "";
});

// --- Función para eliminar tarea del LocalStorage ---
function removeTaskFromStorage(taskText) {
    tasks = tasks.filter(t => t.text !== taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// --- Función para actualizar el estado de completado ---
function updateTaskStatus(taskText, completed) {
    tasks = tasks.map(t => {
        if (t.text === taskText) t.completed = completed;
        return t;
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
