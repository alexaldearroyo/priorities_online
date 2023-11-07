export function saveTask(task) {
  const tasks = getTasks();

  if (!task.id) {
    task.id = Date.now().toString();
  }

  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

export function getTasks() {
  const tasksJSON = localStorage.getItem("tasks");
  if (tasksJSON) {
    return JSON.parse(tasksJSON);
  }
  return [];
}

export function deleteTask(taskId) {
  let tasks = getTasks();
  const tasksBefore = tasks.length;
  taskId = taskId.toString();
  tasks = tasks.filter(task => task.id !== taskId);
  const tasksAfter = tasks.length;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  
  return tasksBefore > tasksAfter;
}
