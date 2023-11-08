
// TASKS

export function saveTask(task) {
  const tasks = getTasks();

  if (!task.id) {
    task.id = Date.now().toString();
  }

  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

export function getTasks(projectId = null) {
  const tasksJSON = localStorage.getItem("tasks");
  let tasks = tasksJSON ? JSON.parse(tasksJSON) : [];
  if (projectId) {
    tasks = tasks.filter(task => task.project === projectId);
  }
  return tasks;
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

  if (projectsBefore > projectsAfter) {
    let tasks = getTasks();
    tasks = tasks.filter(task => task.project !== projectId);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  localStorage.setItem("projects", JSON.stringify(projects));
  
  return projectsBefore > projectsAfter;
}