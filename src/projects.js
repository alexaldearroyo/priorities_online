import { css } from "jquery";
import { saveProject, getProjects, deleteProject } from "./localStorage.js";

function loadProjectsModule() {
  $("#contentBoxHeader").empty();
  $("#contentBoxMain").empty();
  $("#contentBoxHeader").html("Projects");

  const projectButtonContainer = $("<div>", {
    id: "projectButtonContainer",
    class: "flex-center h-1/6 w-full",
  });

  const projectsListContainer = $("<div>", {
    id: "projectsListContainer",
    class: "listContainer h-5/6",
  });

  $("#contentBoxMain").append(projectButtonContainer, projectsListContainer);

  const addProjectButton = $("<button>", {
    id: "addProjectButton",
    class: "addButton",
    text: "Add Project",
    tabindex: 0,
  });

  projectButtonContainer.append(addProjectButton);

  $("#contentBoxMain").on("click", "#addProjectButton", function () {
    const addProjectBox = $("<div>", {
      id: "addProjectBox",
      class:
        "box flex flex-col md:flex-row w-full justify-between gap-x-6 gap-y-2",
    });

    const projectInputBox = $("<input>", {
      type: "text",
      class: "inputBox",
      placeholder: "Enter project name...",
      css: { flex: "3" },
    });

    const createProjectButton = $("<button>", {
      id: "createProjectButton",
      class: "createButton",
      text: "Add Project",
      css: { flex: "1" },
    }).attr("tabindex", 0);

    const cancelProjectButton = $("<button>", {
      id: "cancelProjectButton",
      class: "cancelButton",
      text: "Cancel",
      css: { flex: "1" },
    }).attr("tabindex", 0);

    addProjectBox.append(
      projectInputBox,
      createProjectButton,
      cancelProjectButton
    );
    projectButtonContainer.replaceWith(addProjectBox);

    createProjectButton.off("click").on("click", function () {
        const id = setProjectId();
      const name = projectInputBox.val();

      if (name.trim() !== "") {
        const project = new Project(id, name);
        saveProject(project);

        $("#addProjectBox").remove();
        $("#contentBoxMain").prepend(projectButtonContainer);
        $("#projectButtonContainer").append(addProjectButton);

        displayProjects();
      }
    });

    cancelProjectButton.off("click").on("click", function () {
      $("#addProjectBox").remove();
      $("#contentBoxMain").prepend(projectButtonContainer);
    });
  });

  displayProjects();
}

function setProjectId() {
  return Date.now().toString();
}

function displayProjects() {
  const projects = getProjects();
  const projectsListContainer = $("#projectsListContainer").empty();

  if (projects.length > 0) {
    projects.sort((a, b) => b.id - a.id);
    const projectListBox = $("<div>", {
      class: "box",
    });

    projects.forEach((project, index) => {
        
      const projectLisElement = $("<div>", {
        class: "taskListElement" + (index < projects.length - 1 ? " project-separator" : "") + " flex justify-center items-center w-full gap-x-6",
      });

      const projectName = $("<span>", {
        class: "projectName",
        text: project.name,
        css: { flex: "3" },
      });

      const viewButton = $("<button>", {
        class: "viewButton", // provisional
        text: "View",
        css: { flex: "1" },
      });

      const deleteButton = $("<button>", {
        class: "deleteButton",
        text: "Delete",
        css: { flex: "1" },
      });

      deleteButton.on("click", function () {
        deleteProject(project.id);
          displayProjects();
      });
    
      projectLisElement.append(projectName, viewButton, deleteButton);
      projectListBox.append(projectLisElement);
    });
    projectsListContainer.append(projectListBox);

  }
}

export default loadProjectsModule;

class Project {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}
