var tasks = [];

var savedTasks = localStorage.getItem("tasks");
if (savedTasks) {
  tasks = JSON.parse(savedTasks);
}


var taskForm      = document.getElementById("task-form");
var taskInput     = document.getElementById("task-input");
var prioritySelect = document.getElementById("priority-select");
var categorySelect = document.getElementById("category-select");
var taskList      = document.getElementById("task-list");
var progressText  = document.getElementById("progress-text");
var progressFill  = document.getElementById("progress-fill");
var clearBtn      = document.getElementById("clear-btn");


// Saving tasks to localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}


// Updating the progress bar
function updateProgress() {
  var total = tasks.length;
  var completed = 0;

  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].completed == true) {
      completed++;
    }
  }

  var percentage = 0;
  if (total > 0) {
    percentage = (completed / total) * 100;
  }

  progressText.textContent = completed + " out of " + total + " tasks Completed";
  progressFill.style.width = percentage + "%";
}


// Displaying all tasks
function renderTasks() {

  taskList.innerHTML = "";

  if (tasks.length == 0) {
    var emptyDiv = document.createElement("div");
    emptyDiv.className = "empty-state";
    emptyDiv.innerHTML =
      '<span class="empty-icon">✦</span>' +
      '<p>Nothing here yet.</p>' +
      '<small>Add your first task above.</small>';
    taskList.appendChild(emptyDiv);

    clearBtn.classList.add("hidden");

  } else {

    for (var i = 0; i < tasks.length; i++) {
      createTaskElement(tasks[i], i);
    }

    clearBtn.classList.remove("hidden");
  }

  updateProgress();
}


function createTaskElement(task, index) {

  var li = document.createElement("li");
  li.setAttribute("data-priority", task.priority);
  li.setAttribute("data-index", index);

  if (task.completed == true) {
    li.classList.add("completed");
  }

  var leftDiv = document.createElement("div");

  var taskText = document.createElement("span");
  taskText.textContent = task.text;

  var taskMeta = document.createElement("div");
  taskMeta.className = "task-meta";

  var priorityBadge = document.createElement("span");
  priorityBadge.className = "badge badge-priority";
  priorityBadge.textContent = task.priority;

  var categoryBadge = document.createElement("span");
  categoryBadge.className = "badge badge-category";
  categoryBadge.textContent = task.category;

  taskMeta.appendChild(priorityBadge);
  taskMeta.appendChild(categoryBadge);

  leftDiv.appendChild(taskText);
  leftDiv.appendChild(taskMeta);

  var rightDiv = document.createElement("div");

  var toggleBtn = document.createElement("button");
  if (task.completed == true) {
    toggleBtn.textContent = "Undo";
  } else {
    toggleBtn.textContent = "Complete";
  }

  var deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";

  rightDiv.appendChild(toggleBtn);
  rightDiv.appendChild(deleteBtn);

  li.appendChild(leftDiv);
  li.appendChild(rightDiv);

  toggleBtn.addEventListener("click", function() {
    toggleTask(index);
  });

  deleteBtn.addEventListener("click", function() {
    deleteTask(index);
  });

  taskList.appendChild(li);
}


function addTask(event) {
  // Prevent the form from refreshing the page
  event.preventDefault();

  var text = taskInput.value.trim();
  var priority = prioritySelect.value;
  var category = categorySelect.value;

  if (text == "") {
    return;
  }

  var newTask = {
    text: text,
    priority: priority,
    category: category,
    completed: false
  };

  tasks.push(newTask);

  saveTasks();
  renderTasks();

  taskInput.value = "";
  prioritySelect.value = "Medium";
  categorySelect.value = "General";
  taskInput.focus();
}


function toggleTask(index) {
  // Flip the completed value
  if (tasks[index].completed == true) {
    tasks[index].completed = false;
  } else {
    tasks[index].completed = true;
  }

  saveTasks();
  renderTasks();
}


function deleteTask(index) {
  // Remove 1 item at the given index
  tasks.splice(index, 1);

  saveTasks();
  renderTasks();
}


function clearAllTasks() {
  var confirmed = window.confirm("Are you sure you want to clear all tasks?");

  if (confirmed) {
    tasks = [];
    saveTasks();
    renderTasks();
  }
}


taskForm.addEventListener("submit", addTask);
clearBtn.addEventListener("click", clearAllTasks);


renderTasks();
