import { getTasks } from "./localStorage";

function loadDatesModule() {
  $("#contentBoxMain").empty();
  $("#contentBoxHeader").empty().html("Dates");

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const currentDate = new Date();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const monthTitle = $("<div/>", { id: "monthTitle" }).appendTo(
    "#contentBoxMain"
  );
  const leftArrow = $("<i/>", {
    class: "fas fa-chevron-left cursor-pointer",
    id: "prevMonth",
  }).appendTo(monthTitle);
  const monthText = $("<span/>")
    .text(`${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`)
    .appendTo(monthTitle);
  const rightArrow = $("<i/>", {
    class: "fas fa-chevron-right cursor-pointer",
    id: "nextMonth",
  }).appendTo(monthTitle);


  const weekDayNames = $("<div/>", { class: "weekDayNames" }).appendTo("#contentBoxMain");
  weekDays.forEach(day => {
    $("<div/>", { class: "week-day-name" }).text(day).appendTo(weekDayNames);
  });



  $("#prevMonth").click(function () {
    currentDate.setMonth(currentDate.getMonth() - 1);
    monthText.text(
      `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`
    );
    displayCalendar(currentDate);
  });

  $("#nextMonth").click(function () {
    currentDate.setMonth(currentDate.getMonth() + 1);
    monthText.text(
      `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`
    );
    displayCalendar(currentDate);
  });




  displayCalendar(currentDate);
}



function displayCalendar(date) {

  let calendarContainer = $("#calendarView");

  if (calendarContainer.length === 0) {
    calendarContainer = $("<div/>", { id: "calendarView" }).appendTo("#contentBoxMain");
  } else {
    calendarContainer.empty();
  }


  
  $("#calendarView").empty();
  const tasks = getTasks();

  const taskDates = tasks.map((task) => new Date(task.date).toDateString());

  // const calendarView = $("<div/>", { id: "calendarView" }).appendTo(
  //   "#contentBoxMain"
  // );

  const firstDayDate = new Date(date.getFullYear(), date.getMonth(), 1);
  const firstDayOfMonth = firstDayDate.getDay();
  const daysInMonth = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();

  for (let i = 0; i < 6 * 7; i++) {
    const dayElement = $("<div/>", { class: "dayElement" });
    const dayNumber = i - firstDayOfMonth + 1;

    if (i >= firstDayOfMonth && dayNumber <= daysInMonth) {
      const dayDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        dayNumber
      ).toDateString();

      dayElement.text(dayNumber);

      if (taskDates.includes(dayDate)) {
        dayElement.addClass("with-task");
        dayElement.data('date', dayDate);
      }
    } else {
      dayElement.addClass("outside-month");

      if (i < firstDayOfMonth) {
        const lastDayOfPrevMonth = new Date(
          date.getFullYear(),
          date.getMonth(),
          0
        );
        const dayPrevMonth =
          lastDayOfPrevMonth.getDate() - (firstDayOfMonth - i) + 1;
        dayElement.text(dayPrevMonth);
      } else {
        const dayNextMonth = dayNumber - daysInMonth;
        dayElement.text(dayNextMonth);
      }
    }
    dayElement.appendTo("#calendarView");

    calendarContainer.find('.dayElement.with-task').on('click', function() {
      const date = $(this).data('date');
      displayTasksForDate(date);
    });
    
  }
}

function displayTasksForDate(date) {
  const tasksForDate = getTasks().filter((task) => new Date(task.date).toDateString() === date);

  $('.popup-container').remove();

  const popupContainer = $('<div>', { class: 'popup-container', css: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
    width: '50%',
    maxHeight: '80%',
    overflowY: 'auto',
  } });

  const popupCloseButton = $('<i>', { class: 'fas fa-times', css: {
    cursor: 'pointer',
    position: 'absolute',
    top: '10px',
    right: '10px',
    fontWeight: 'bold',
    color: '#555',
  }});

  popupCloseButton.on('click', function() {
    popupContainer.remove();
  });

  popupContainer.append(popupCloseButton);

  if(tasksForDate.length === 0) {
    popupContainer.append($('<p>', { text: 'No tasks on this date.', css: { textAlign: 'center' } }));
  } else {
    tasksForDate.forEach(task => {
      const taskElement = $('<div>', { class: 'task-popup-item', css: {
        // borderBottom: '1px solid #eee',
        paddingBottom: '10px',
        marginBottom: '10px'
      }});

      const taskName = $('<div>', { text: task.name, css: { fontWeight: 'bold' } });
      const taskDate = $('<div>', { text: task.date, css: { color: '#555', fontSize: '0.9em' } });
      const taskPriority = $('<div>', { text: `Priority: ${task.priority}`, css: { color: getPriorityColor(task.priority) } });
      const taskProject = $('<div>', { text: `Project: ${task.project}`, css: { color: '#555', fontSize: '0.9em' } });

      taskElement.append(taskName, taskDate, taskPriority, taskProject);
      popupContainer.append(taskElement);
    });
  }

  $('#contentBoxMain').css({position: 'relative'}).append(popupContainer);
}

function getPriorityColor(priority) {
  switch (priority) {
    case 'High':
      return 'red';
    case 'Medium':
      return 'orange';
    case 'Low':
      return 'green';
    default:
      return 'black';
  }
}

export default loadDatesModule;
