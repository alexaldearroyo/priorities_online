import { getTasks } from "./localStorage.js";
import { updatePriorityMenus } from "./tasks.js";

export function displayTasks() {
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
  }