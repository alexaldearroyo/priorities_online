import { saveTask, getTasks, deleteTask, getProjects } from "./localStorage.js";

function loadTasksModule() {
  $("#contentBoxHeader").empty();
  $("#contentBoxMain").empty();
  $("#contentBoxHeader").html("Tasks");
  $("#contentBoxMain").addClass("flex flex-col");

  const taskButtonContainer = $("<div>", {
    id: "taskButtonContainer",
    class: "buttonContainer h-1/6",
  });
  const tasksListContainer = $("<div>", {
    id: "tasksListContainer",
    class: "listContainer h-5/6",
  });

  $("#contentBoxMain").append(taskButtonContainer, tasksListContainer);

  $("#contentBoxMain").on("click", "#addTaskButton", function () {
    const addTaskBox = $("<div>", {
      id: "addTaskBox",
      class: "box flex flex-col md:flex-row w-full justify-between gap-x-6",
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
        $(this).removeClass("high-priority medium-priority low-priority");
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

    const projectSelector = $("<select>", {
      id: "projectSelector",
      class: "selector",
    }).append($("<option>", { value: "", text: "Project", selected: true }));

    const projects = getProjects();
    projects.forEach((project) => {
      projectSelector.append(
        $("<option>", {
          value: project.name,
          text: project.name,
        })
      );
    });

    addTaskBoxLeftBottom.append(
      prioritySelector,
      dateSelector,
      projectSelector
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
      const project = projectSelector.val();

      if (name.trim() !== "") {
        const task = new Task(id, name, priority, date, project);
        saveTask(task);

        $("#addTaskBox").remove();
        $("#contentBoxMain").prepend(taskButtonContainer);
        $("#taskButtonContainer").append(addTaskButton);

        displayTasks();
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
      $("#contentBoxMain").prepend(taskButtonContainer);
      $("#taskButtonContainer").append(addTaskButton);
    });

    addTaskBoxLRightBottom.append(cancelTaskButton);

    addTaskBoxRight.append(
      addTaskBoxRightTop,
      addTaskBoxLRightBottom,
      third,
      fourth
    );

    addTaskBox.append(addTaskBoxLeft, addTaskBoxRight);
    taskButtonContainer.replaceWith(addTaskBox);
  });

  const addTaskButton = $("<button>", {
    id: "addTaskButton",
    class: "addButton mb-1",
    text: "Add Task",
    tabindex: 0,
  });
  taskButtonContainer.append(addTaskButton);

  displayTasks();
}

function setTaskId() {
  return Date.now().toString();
}

function displayTasks() {
  const tasks = getTasks();
  const taskListContainer = $("#tasksListContainer");
  taskListContainer.empty();

  if (tasks.length > 0) {
    tasks.sort((a, b) => b.id - a.id);
    const taskListBox = $("<div>", {
      class: "box",
    });

    tasks.forEach((task, index) => {
      const taskListElement = $("<div>", {
        class:
          "taskListElement" +
          (index < tasks.length - 1 ? " task-separator" : "") +
          " flex flex-col",
      });

      const taskName = $("<span>", {
        class: "taskName",
        text: task.name,
      });

      taskListElement.append(taskName);

      if (task.priority) {
        let priorityClass = "";
        switch (task.priority) {
          case "High":
            priorityClass = "high-priority";
            break;
          case "Medium":
            priorityClass = "medium-priority";
            break;
          case "Low":
            priorityClass = "low-priority";
            break;
        }

        const priorityLabel = $("<span>", {
          class: `label priorityLabel ${priorityClass}`,
          text: task.priority,
        });
        // taskListElementBottom.append(priorityLabel);
        taskListElement.append(priorityLabel);
      }

      if (task.date) {
        const dateLabel = $("<span>", {
          class: "label dateLabel",
          text: task.date,
        });
        taskListElement.append(dateLabel);

      }

      if (task.project) {
        const projectLabel = $("<span>", {
          class: "label projectLabel",
          text: task.project,
        });
        taskListElement.append(projectLabel);
      }

      const completeButton = $("<button>", {
        class: "completeButton",
        text: "Complete",
        "data-id": task.id,
      }).attr("tabindex", 0);

      completeButton.on("click", function () {
        const taskId = $(this).data("id").toString();
        const wasDeleted = deleteTask(taskId);

        if (wasDeleted) {
          const taskElement = $(this).closest(".taskListElement");
          taskElement.remove();
      
          const remainingTasks = $(".taskListElement");
          if (remainingTasks.length > 0) {
            remainingTasks.last().removeClass("task-separator");
          }
      
          if (remainingTasks.length === 0) {
            $("#tasksListContainer").empty();
          }
        } else {
          console.error("Task could not be deleted.");
        }
        updatePriorityMenus();
      });

      taskListElement.append(completeButton);

      taskListBox.append(taskListElement);
    });

    taskListContainer.append(taskListBox);
  }
  updatePriorityMenus();
  return mainContainer;
}

export default loadTasksModule;

export function updatePriorityMenus() {
  const tasks = getTasks();
  const priorityLevels = ["High", "Medium", "Low"];

  priorityLevels.forEach((priority) => {
    const hasPriorityTask = tasks.some((task) => task.priority === priority);
    const menuSelector = `#${priority.toLowerCase()}PriorityMenu`;
    const bulletClass = `${priority.toLowerCase()}-priority-bullet`;

    if (hasPriorityTask) {
      $(menuSelector).addClass(bulletClass);
    } else {
      $(menuSelector).removeClass(bulletClass);
    }
  });
}

class Task {
  constructor(id, name, priority, date, project) {
    this.id = id;
    this.name = name;
    this.priority = priority;
    this.date = date;
    this.project = project;
  }
}
