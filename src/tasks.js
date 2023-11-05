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
    class: "flex-center h-5/6",
  }).html("Task List Container");

  const addButton = $("<button>", {
    id: "addButton",
    class: "addButton",
    text: "Add Task",
  });

  $("#contentBoxMain").append(taskButtonContainer, tasksListContainer);
  taskButtonContainer.append(addButton);

  // Add Task Box Structure

  addButton.on("click", function () {
    const addTaskBox = $("<div>", {
      id: "addTask",
      class: "addBox flex w-full justify-between",
    });

    const addTaskBoxLeft = $("<div>", {
      id: "addTaskBoxLeft",
      class: "w-10/13 flex flex-col items-center",
      style: "flex: 10;",
    });

    const addTaskBoxTop = $("<div>", {
      id: "addTaskBoxTop",
      class: "h-1/2 w-full flex justify-center items-center p-2",
    });

    const inputBox = $("<input>", {
        type: "text",
        class: "rounded-lg border-2 border-gray-700 bg-white w-full p-2 py-1",
        placeholder: "Enter task...",
        css: { "border-radius": "10px" },
      });
  
      addTaskBoxTop.append(inputBox);

    const addTaskBoxBottom = $("<div>", {
      id: "addTaskBoxBottom",
      class: "h-1/2 w-full flex justify-center items-center pt-2",
      text: "Add Task Box Bottom",
    });

    addTaskBoxLeft.append(addTaskBoxTop, addTaskBoxBottom);

    const addTaskBoxRight = $("<div>", {
      id: "addTaskBoxRight",
      class: "w-3/13 flex flex-col justify-center items-center",
      style: "flex: 3;",
      text: "Buttons",
    });

    addTaskBox.append(addTaskBoxLeft, addTaskBoxRight);
    taskButtonContainer.replaceWith(addTaskBox);
  });
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
