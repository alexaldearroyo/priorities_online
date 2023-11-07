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
      class: "box flex flex-col md:flex-row w-full justify-between gap-x-6 gap-y-2",
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
    
    cancelProjectButton.on("click", function () {
        $("#addProjectBox").remove();
        $("#contentBoxMain").prepend(projectButtonContainer);
      });


      addProjectBox.append(projectInputBox, createProjectButton, cancelProjectButton);
      projectButtonContainer.replaceWith(addProjectBox);


    // displayProjects();
    });
}

export default loadProjectsModule;

class Project {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}
