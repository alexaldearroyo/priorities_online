
// TASKS

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

// PROJECTS

export function saveProject(project) {
  const projects = getProjects();

  if (!project.id) {
    project.id = Date.now().toString();
  }

  projects.push(project);
  localStorage.setItem("projects", JSON.stringify(projects));
}

export function getProjects() {
  const projectsJSON = localStorage.getItem("projects");
  if (projectsJSON) {
    return JSON.parse(projectsJSON);
  }
  return [];
}

export function deleteProject(projectId) {
  let projects = getProjects();
  const projectsBefore = projects.length;
  projectId = projectId.toString();
  projects = projects.filter(project => project.id !== projectId);
  const projectsAfter = projects.length;
  localStorage.setItem("projects", JSON.stringify(projects));
  
  return projectsBefore > projectsAfter;
}