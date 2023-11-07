import { updatePriorityMenus } from "./tasks";
import { saveTask, getTasks, deleteTask } from "./localStorage.js";

// Possible future implementation
export function loadPrioritiesModule() {
  $("#contentBoxHeader").empty();
  $("#contentBoxMain").empty();
  $("#contentBoxHeader").html("Priorities");
  $("#contentBoxMain").html("Priorities Module Content");
}

export default function loadPriorities(priority) {
  $("#contentBoxHeader").empty();
  $("#contentBoxMain").empty();
  $("#contentBoxHeader").html(`Priorities: ${priority}`);
  $("#contentBoxMain").empty().addClass("flex flex-col");


  if ($("#tasksListContainer").length === 0) {
    const tasksListContainer = $("<div>", {
      id: "tasksListContainer",
      class: "listContainer h-5/6",
    });
    $("#contentBoxMain").append(tasksListContainer);
  }


  displayPriorities(priority);
}

function displayPriorities(priority) {

  const tasks = getTasks().filter((task) => task.priority === priority);
  const taskListContainer = $("#tasksListContainer");
  taskListContainer.empty();

  let boxClass = 'listContainer box';
  switch (priority) {
    case 'High':
      boxClass += ' box-high-priority';
      break;
    case 'Medium':
      boxClass += ' box-medium-priority';
      break;
    case 'Low':
      boxClass += ' box-low-priority';
      break;
  }

  // Use the determined class when creating the taskListBox
  const taskListBox = $("<div>", {
    class: boxClass,
  });

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

      const taskListElementTop = $("<div>", {
        class: "taskListElementTop flex justify-between items-center w-full",
      });

      const taskName = $("<span>", {
        class: "taskName",
        text: task.name,
      });

      const completeButton = $("<button>", {
        class: "completeButton",
        text: "Complete",
        "data-id": task.id,
      }).attr("tabindex", 0);

      completeButton.on("click", function () {
        const taskId = $(this).data("id").toString();
        const wasDeleted = deleteTask(taskId);

        if (wasDeleted) {
          $(this).closest(".taskListElement").remove();

          if (getTasks().length === 1) {
            $(".taskListElement").removeClass("task-separator");
          }

          if (getTasks().length === 0) {
            $("#tasksListContainer").empty();
          }
        } else {
          console.error("Task could not be deleted.");
        }
        updatePriorityMenus();
      });

      taskListElementTop.append(taskName, completeButton);

      const taskListElementBottom = $("<div>", {
        class:
          "taskListElementBottom flex flex-wrap sm:flex-row justify-start items-center py-2 w-full",
      });

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
        taskListElementBottom.append(priorityLabel);
      }

      if (task.date) {
        const dateLabel = $("<span>", {
          class: "label dateLabel",
          text: task.date,
        });
        taskListElementBottom.append(dateLabel);
      }

      if (task.project) {
        const projectLabel = $("<span>", {
          class: "label projectLabel",
          text: task.project,
        });
        taskListElementBottom.append(projectLabel);
      }

      taskListElement.append(taskListElementTop, taskListElementBottom);

      taskListBox.append(taskListElement);
    });

    taskListContainer.append(taskListBox);
  } 
  
  else {
    taskListContainer.append($("<p>", {
        text: `No ${priority.toLowerCase()} priority tasks.`,
        class: "no-tasks-message"
    }));
}

  updatePriorityMenus();
}