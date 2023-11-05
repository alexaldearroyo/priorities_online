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
      class: "addBox flex flex-col md:flex-row w-full justify-between",
    });

    const addTaskBoxLeft = $("<div>", {
      id: "addTaskBoxLeft",
      class: "flex flex-1 flex-col items-center",
      style: "flex: 10;",
    });

    const addTaskBoxTop = $("<div>", {
      id: "addTaskBoxTop",
      class: "h-1/2 w-full flex justify-center items-center",
    });

    const inputBox = $("<input>", {
      type: "text",
      class: "rounded-lg border-2 border-gray-700 bg-white w-full p-2 py-1 mb-2",
      placeholder: "Enter task...",
      css: { "border-radius": "10px" },
    });

    addTaskBoxTop.append(inputBox);

    const addTaskBoxBottom = $("<div>", {
      id: "addTaskBoxBottom",
      class: "flex flex-wrap sm:flex-row justify-between items-center py-2 w-full",
    });

    const prioritySelector = $("<select>", {
        id: "prioritySelector",
        class: "selector mr-5", 
      }).append(
        $("<option>", { value: "", text: "Priority", selected: true}),
        $("<option>", { value: "High", text: "High" }),
        $("<option>", { value: "Medium", text: "Medium" }),
        $("<option>", { value: "Low", text: "Low" })
        ).on("change", function() {
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
        placeholder: "Date"
    }).on("change", function() {
        if (this.value) {
            $(this).addClass("has-date");
        } else {
            $(this).removeClass("has-date");
        }
    });
    
    const projectSelector = $("<select>", {
        id: "projectSelector",
        class: "selector",
      }).append($("<option>", { value: "", text: "Project", disabled: true}));

    addTaskBoxBottom.append(prioritySelector, dateSelector, projectSelector);

    addTaskBoxLeft.append(addTaskBoxTop, addTaskBoxBottom);

    const addTaskBoxRight = $("<div>", {
      id: "addTaskBoxRight",
      class: "flex flex-1 flex-col justify-center items-center",
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
