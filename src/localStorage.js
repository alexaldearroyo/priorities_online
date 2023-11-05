export function saveTask(task) {
  const tasks = getTasks();
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


