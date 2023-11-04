import "./styles.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import $ from "jquery";
import loadDatesModule from "./dates.js";
import loadTasksModule from "./tasks.js";
import loadProjectsModule from "./projects.js";
import loadPrioritiesModule from "./priorities.js";

$(function () {
  loadTasksModule();

  $("#burgerMenu").on("click", function () {
    var icon = $(this).find("i");

    if (icon.hasClass("rotated")) {
      icon.removeClass("rotated");
    } else {
      icon.addClass("rotated");
    }

    $("#sideBarContainer").toggle();
    $("#contentBox").toggleClass("expanded");
  });

  $("#sideBarMenu > div").on("click", function () {
    $("#sideBarMenu > div").removeClass("active");
    $(this).addClass("active");

    if ($(window).width() < 1200) {
        if (this.id !== "prioritiesMenu") {
            $("#sideBarContainer").hide();
            $("#contentBox").removeClass("expanded");
        }
    }

    switch (this.id) {
      case "tasksMenu":
        loadTasksModule();
        break;
      case "prioritiesMenu":
        loadPrioritiesModule();
        break;
      case "projectsMenu":
        loadProjectsModule();
        break;
      case "datesMenu":
        loadDatesModule();
        break;
    }
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
