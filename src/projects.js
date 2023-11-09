import {
  saveTask,
  getTasks,
  saveProject,
  getProjects,
  deleteProject,
} from "./localStorage.js";
import { displayTasks, setTaskId, updatePriorityMenus, Task } from "./tasks.js";

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

  const addProjectButton = $("<button>", {
    id: "addProjectButton",
    class: "addButton",
    text: "Add Project",
    tabindex: 0,
  });

  projectButtonContainer.append(addProjectButton);
  $("#contentBoxMain").append(projectButtonContainer, projectsListContainer);

  $("#contentBoxMain").on("click", "#addProjectButton", function () {

    $(".viewButton").prop("disabled", true);
    $(".deleteButton").prop("disabled", true);

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
      $(".viewButton").prop("disabled", false);
      $(".deleteButton").prop("disabled", false);
  
    });

    cancelProjectButton.off("click").on("click", function () {
      $("#addProjectBox").remove();
      $("#contentBoxMain").prepend(projectButtonContainer);
      $(".viewButton").prop("disabled", false);
      $(".deleteButton").prop("disabled", false);
  
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
      const tasks = getTasks();

      const projectTaskCount = tasks.filter(
        (task) => task.project === project.name
      ).length;

      const projectLisElement = $("<div>", {
        class:
          "taskListElement" +
          (index < projects.length - 1 ? " project-separator" : "") +
          " flex justify-center items-center w-full gap-x-4",
      });

      const projectName = $("<span>", {
        class: "projectName",
        text: project.name,
        css: { flex: "1" },
      });

      const taskCountDisplay = $("<span>", {
        id: "taskCountDisplay",
        class: "label",
        text: `Tasks: ${projectTaskCount}`,
        // css: { flex: "3" },
      });

      const viewButton = $("<button>", {
        class: "viewButton",
        text: "View",
        // css: { flex: "3" },
      });

      viewButton.on("click", function () {
        $("#projectButtonContainer").remove();
        $("#projectsListContainer").remove();
        $("#contentBoxHeader").html(`Project: ${project.name}`);

        const projectButtonContainer = $("<div>", {
          id: "projectButtonContainer",
          class: "buttonContainer flex justify-between",
        });

        const addTaskInProjectButton = $("<button>", {
          id: "addTaskInProjectButton",
          class: "addButton",
          text: "Add Task to Project",
          css: { margin: "1rem" },
        }).attr("tabindex", 0);

        $("#contentBoxMain").on(
          "click",
          "#addTaskInProjectButton",
          function () {
            const addTaskBox = $("<div>", {
              id: "addTaskBox",
              class:
                "box flex flex-col md:flex-row w-full justify-between gap-x-6",
            });

            const addTaskBoxLeft = $("<div>", {
              id: "addTaskBoxLeft",
              class: "flex flex-1 flex-col items-center",
              style: "flex: 10;",
            });

            const addTaskBoxLeftTop = $("<div>", {
              id: "addTaskBoxLeftTop",
              class: "h-1/2 w-full flex justify-center items-center",
            });

            const taskInputBox = $("<input>", {
              type: "text",
              class: "inputBox",
              placeholder: "Enter task...",
            });

            addTaskBoxLeftTop.append(taskInputBox);

            const addTaskBoxLeftBottom = $("<div>", {
              id: "addTaskBoxLeftBottom",
              class:
                "flex flex-wrap sm:flex-row justify-center items-center py-2 w-full",
            });

            const prioritySelector = $("<select>", {
              id: "prioritySelector",
              class: "selector mr-5",
            })
              .append(
                $("<option>", { value: "", text: "Priority", selected: true }),
                $("<option>", { value: "High", text: "High" }),
                $("<option>", { value: "Medium", text: "Medium" }),
                $("<option>", { value: "Low", text: "Low" })
              )
              .on("change", function () {
                $(this).removeClass(
                  "high-priority medium-priority low-priority"
                );
                switch (this.value) {
                  case "High":
                    $(this).addClass("high-priority");
                    break;
                  case "Medium":
                    $(this).addClass("medium-priority");
                    break;
                  case "Low":
                    $(this).addClass("low-priority");
                    break;
                }
              });
            const dateSelector = $("<input>", {
              type: "date",
              class: "selector mr-5",
              value: "",
              placeholder: "Date",
            }).on("change", function () {
              if (this.value) {
                $(this).addClass("has-date");
              } else {
                $(this).removeClass("has-date");
              }
            });

            const projectNameLabel = $("<span>", {
              value: project.name,
              text: project.name,
              class: "label2",
            });

            addTaskBoxLeftBottom.append(
              prioritySelector,
              dateSelector,
              projectNameLabel
            );

            addTaskBoxLeft.append(addTaskBoxLeftTop, addTaskBoxLeftBottom);

            const addTaskBoxRight = $("<div>", {
              id: "addTaskBoxRight",
              class: "flex flex-1 flex-col items-center align-center",
              style: "flex: 3",
            });

            const addTaskBoxRightTop = $("<div>", {
              id: "addTaskBoxRightTop",
              class: "h-1/2 w-full flex justify-center items-center mb-2",
            });

            const createTaskButton = $("<button>", {
              id: "createTaskButton",
              class: "createButton",
              text: "Add Task",
            }).attr("tabindex", 0);

           

            createTaskButton.prop("disabled", true);

            createTaskButton.on("click", function () {
              const id = setTaskId();
              const name = taskInputBox.val();
              const priority = prioritySelector.val();
              const date = dateSelector.val();            
              const projectNameText = projectName.text();

              if (name.trim() !== "") {
                const task = new Task(id, name, priority, date, projectNameText);
                saveTask(task);

                $("#addTaskBox").remove();
                $("#contentBoxMain").prepend(projectButtonContainer);
                $("#projectButtonContainer").append(
                  addTaskInProjectButton,
                  goBackButton
                );

                displayTasks(projectNameText);
              }
              updatePriorityMenus();
            });

            taskInputBox.on("input", function () {
              const inputText = $(this).val();
              if (inputText.trim() !== "") {
                createTaskButton.prop("disabled", false);
                createTaskButton.attr("tabindex", 0);
              } else {
                createTaskButton.prop("disabled", true);
                createTaskButton.attr("tabindex", -1);
              }
            });

            addTaskBoxRightTop.append(createTaskButton);

            const addTaskBoxLRightBottom = $("<div>", {
              id: "addTaskBoxLRightBottom",
              class: "h-1/2 w-full flex justify-center items-center",
            });
            const third = $("<div>", {
              class: "h-1/2 w-full flex justify-center",
            });
            const fourth = $("<div>", {
              class: "h-1/2 w-full flex justify-center",
            });

            const cancelTaskButton = $("<button>", {
              id: "cancelTaskButton",
              class: "cancelButton",
              text: "Cancel",
            }).attr("tabindex", 0);

            cancelTaskButton.on("click", function () {
              $("#addTaskBox").remove();
              $("#contentBoxMain").prepend(projectButtonContainer);
              $("#projectButtonContainer").empty();
              $("#projectButtonContainer").append(
                addTaskInProjectButton,
                goBackButton
              );
            });

            addTaskBoxLRightBottom.append(cancelTaskButton);

            addTaskBoxRight.append(
              addTaskBoxRightTop,
              addTaskBoxLRightBottom,
              third,
              fourth
            );

            addTaskBox.append(addTaskBoxLeft, addTaskBoxRight);
            projectButtonContainer.replaceWith(addTaskBox);
          }
        );

        const goBackButton = $("<button>", {
          id: "goBackButton",
          class: "addButton",
          text: "Go Back",
          css: { margin: "1rem" },
        }).attr("tabindex", 0);

        $("#contentBoxMain").on("click", "#goBackButton", function () {
          $("#projectButtonContainer").remove();
          $("#tasksListContainer").remove();
          $("#contentBoxHeader").html("Projects");

          const projectButtonContainer = $("<div>", {
            id: "projectButtonContainer",
            class: "flex-center h-1/6 w-full",
          });

          const projectsListContainer = $("<div>", {
            id: "projectsListContainer",
            class: "listContainer h-5/6",
          });

          const addProjectButton = $("<button>", {
            id: "addProjectButton",
            class: "addButton",
            text: "Add Project",
            tabindex: 0,
          });
          projectButtonContainer.append(addProjectButton);
          $("#contentBoxMain")
            .empty()
            .append(projectButtonContainer, projectsListContainer);
          loadProjectsModule();
        });

        projectButtonContainer.append(addTaskInProjectButton, goBackButton);

        const tasksListContainer = $("<div>", {
          id: "tasksListContainer",
          class: "listContainer",
        });

        const taskListBox = $("<div>", {
          id: "taskListBox",
          class: "box",
          text: "Tasks",
        });

        tasksListContainer.append(taskListBox);

        $("#contentBoxMain").append(projectButtonContainer, tasksListContainer);
        displayTasks(project.name);
      });

      const deleteButton = $("<button>", {
        class: "deleteButton",
        text: "Delete",
        // css: { flex: "3" },
      });

      deleteButton.on("click", function () {
        deleteProject(project.id);
        displayProjects();
      });

      projectLisElement.append(
        projectName,
        taskCountDisplay,
        viewButton,
        deleteButton
      );
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
