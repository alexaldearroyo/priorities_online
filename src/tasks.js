import { saveTask, getTasks } from "./localStorage.js";

function loadTasksModule() {
  $("#contentBoxHeader").empty();
  $("#contentBoxMain").empty();
  $("#contentBoxHeader").html("Tasks");
  $("#contentBoxMain").addClass("flex flex-col");

  const taskButtonContainer = $("<div>", {
    id: "taskButtonContainer",
    class: "flex-center h-1/6 w-full mt-4",
  });
  const tasksListContainer = $("<div>", {
    id: "tasksListContainer",
    class: "listContainer flex-center h-5/6",
  }).html("Task List Container");

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
      class:
        "inputBox rounded-lg border-2 border-gray-700 bg-white w-full p-2 py-1  mb-2", // TODO: Later define class in styles.css (inputBox)
      placeholder: "Enter task...",
      css: { "border-radius": "10px" },
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
    }).append($("<option>", { value: "", text: "Project", disabled: true }));

    addTaskBoxLeftBottom.append(
      prioritySelector,
      dateSelector,
      projectSelector
    );

    addTaskBoxLeft.append(addTaskBoxLeftTop, addTaskBoxLeftBottom);

    const addTaskBoxRight = $("<div>", {
      id: "addTaskBoxRight",
      class: "flex flex-1 flex-col justify-center items-center gap-y-2",
      style: "flex: 3",
    });

    const addTaskBoxRightTop = $("<div>", {
      id: "addTaskBoxRightTop",
      class: "h-1/2 w-full flex justify-center items-center",
    });

    const createTaskButton = $("<button>", {
      id: "createTaskButton",
      class: "createButton w-full mb-2",
      text: "Add Task",
    });

    createTaskButton.prop("disabled", true);

    createTaskButton.on("click", function () {
      const id = setTaskId();
      const name = taskInputBox.val();
      const priority = prioritySelector.val();
      const date = dateSelector.val();
      const project = projectSelector.val(); // TO-DO: Add project logic

      if (name.trim() !== "") {
        const task = new Task(id, name, priority, date, project);
        saveTask(task);

        $("#addTaskBox").remove();
        $("#contentBoxMain").prepend(taskButtonContainer);
        $("#taskButtonContainer").append(addTaskButton);

        displayTasks(); 
      }
    });

    taskInputBox.on("input", function () {
      const inputText = $(this).val();
      if (inputText.trim() !== "") {
        createTaskButton.prop("disabled", false);
      } else {
        createTaskButton.prop("disabled", true);
      }
    });

    addTaskBoxRightTop.append(createTaskButton);

    const addTaskBoxLRightBottom = $("<div>", {
      id: "addTaskBoxLeftBottom",
      class: "h-1/2 w-full flex justify-center items-center",
    });
    const third = $("<div>", {
      id: "addTaskBoxLeftBottom",
      class: "h-1/2 w-full flex justify-center",
    });
    const fourth = $("<div>", {
      id: "addTaskBoxLeftBottom",
      class: "h-1/2 w-full flex justify-center",
    });

    const cancelTaskButton = $("<button>", {
      id: "cancelTaskButton",
      class: "cancelButton w-full",
      text: "Cancel",
    });

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
    class: "addButton",
    text: "Add Task",
  });
  taskButtonContainer.append(addTaskButton);

  displayTasks();

}

function setTaskId() {
  return Date.now().toString();
}

function displayTasks() {
  const tasks = getTasks();
  const taskListContainer = $("#tasksListContainer",);
  taskListContainer.empty();

  if (tasks.length > 0) {
    tasks.sort((a, b) => b.id - a.id);
    const taskListBox = $("<div>", {
      class: "box",
    });

    tasks.forEach((task) => {
      const taskListElement = $("<div>", {
        class: "taskListElement",
        text: task.name, // TODO: Design taskListElement
      });

      taskListBox.append(taskListElement);
    });

    taskListContainer.append(taskListBox);
  }
}

export default loadTasksModule;

class Task {
  constructor(id, name, priority, date, project) {
    this.id = id;
    this.name = name;
    this.priority = priority;
    this.date = date;
    this.project = project;
  }
}
