import "./styles.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import $ from "jquery";
import loadDatesModule from "./dates.js";
import loadTasksModule from "./tasks.js";
import loadProjectsModule from "./projects.js";
import { updatePriorityBullets } from "./priorities.js";

$(document).ready(function() {
  function activateMenuItem(item) {
      $("#sideBarMenu > div").removeClass("active");
      $(item).addClass("active");
  }

  $("#sideBarMenu > div").on("click", function () {
      activateMenuItem(this);

      if ($(window).width() < 1200) {
          if (this.id !== "prioritiesMenu") {
              $("#sideBar").hide();
              $("#contentBox").removeClass("expand");
          }
      }

      switch (this.id) {
          case "tasksMenu":
              loadTasksModule();
              break;
          case "prioritiesMenu":
              // loadPrioritiesModule(); Possible future implementation
              break;
          case "projectsMenu":
              loadProjectsModule();
              break;
          case "datesMenu":
              loadDatesModule();
              break;
      }
  });

  // Activa el elemento 'tasks' cuando la página se cargue
  activateMenuItem("#tasksMenu");
});


$(function () {
  loadTasksModule();

  $("#burgerMenu").on("click", function () {
    var icon = $(this).find("i");

    if (icon.hasClass("rotated")) {
      icon.removeClass("rotated");
    } else {
      icon.addClass("rotated");
    }

    $("#sideBar").toggle();
    $("#contentBox").toggleClass("expand");
  });

  $("#prioritiesMenu").on("click", function (e) {
    e.stopPropagation();
    $("#prioritiesSubMenu").toggle();
    $(this).find(".fa-chevron-right").toggleClass("rotated-down");
  });

  $("#prioritiesSubMenu > div").on("click", function (e) {
    e.stopPropagation();
  });

  $(document).on("click", function () {
    $("#prioritiesSubMenu").hide();
    $("#prioritiesMenu .fa-chevron-right").removeClass("rotated-down");
  });

  $("#tasksMenu").on("click", function () {
    loadTasksModule();
  });

  $("#projectsMenu").on("click", function () {
    loadProjectsModule();
  });

  $("#datesMenu").on("click", function () {
    loadDatesModule();
  });
});
