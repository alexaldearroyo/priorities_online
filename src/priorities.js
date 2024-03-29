import { displayTasks, updatePriorityMenus } from "./tasks";

export default function loadPriorities(priority) {
  // Set up the header and main container
  $("#contentBoxHeader").empty().html(`Priorities: ${priority}`);
  $("#contentBoxMain").empty().addClass("flex flex-col");

  let tasksListContainer = $("#tasksListContainer");
  if (tasksListContainer.length === 0) {
    tasksListContainer = $("<div>", {
      id: "tasksListContainer",
      class: "listContainer h-5/6",
    }).appendTo("#contentBoxMain");
  }

  displayTasks(null, priority);
  updatePriorityMenus();
}
