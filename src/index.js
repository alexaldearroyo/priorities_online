import "./styles.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import $ from "jquery";

$(function () {
    $("#burgerMenu").on("click", function () {
      var icon = $(this).find("i");
  
      if (icon.hasClass('rotated')) {
          icon.removeClass('rotated');
      } else {
          icon.addClass('rotated');
      }
  
      // Toggle la visibilidad de sideBarContainer
      $("#sideBarContainer").toggle();
      $("#contentBoxContainer").toggleClass("expanded");
    });
  });
  
