const tasks = [];
const taskForm = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const listTasks = document.querySelector(".listTasks");
const emptyState = document.querySelector("#empty-state");
const taskCount = document.querySelector("#task-count");

function updateTaskSummary() {
	const remainingTasks = tasks.filter((task) => !task.done).length;
	taskCount.textContent = `${remainingTasks} ${remainingTasks === 1 ? "task" : "tasks"}`;
	emptyState.hidden = tasks.length > 0;
}

function doneTask(event) {
	const taskElement = event.target.closest(".task");
	const task = tasks.find((item) => item.task_id === Number(taskElement.dataset.taskId));
	if (!task) return;

	task.done = event.target.checked;
	taskElement.classList.toggle("done", task.done);
	updateTaskSummary();
}

function deleteTask(event) {
	const taskElement = event.currentTarget.closest(".task");
	const taskId = Number(taskElement.dataset.taskId);
	const taskIndex = tasks.findIndex((task) => task.task_id === taskId);
	if (taskIndex === -1) return;

	tasks.splice(taskIndex, 1);
	taskElement.remove();
	updateTaskSummary();
}

function addTask(event) {
	event.preventDefault();
	const text = taskInput.value.trim();
	if (!text) {
		taskInput.focus();
		return;
	}

	const task = { task_id: tasks.length ? Math.max(...tasks.map((item) => item.task_id)) + 1 : 0, text, done: false };
	tasks.push(task);

	const taskElement = document.createElement("div");
	taskElement.className = "task";
	taskElement.dataset.taskId = task.task_id;
	taskElement.innerHTML = `<input class="task-checkbox" type="checkbox" id="task-${task.task_id}"><label class="task-label" for="task-${task.task_id}"></label><button class="delete-task" type="button" aria-label="Delete ${text}"><i class="fa-solid fa-xmark" aria-hidden="true"></i></button>`;
	taskElement.querySelector(".task-label").textContent = task.text;
	taskElement.querySelector(".task-checkbox").addEventListener("change", doneTask);
	taskElement.querySelector(".delete-task").addEventListener("click", deleteTask);
	listTasks.append(taskElement);

	taskInput.value = "";
	taskInput.focus();
	updateTaskSummary();
}

taskForm.addEventListener("submit", addTask);
updateTaskSummary();
