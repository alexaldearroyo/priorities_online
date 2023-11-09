import { getTasks } from "./localStorage";

function loadDatesModule() {
    $('#contentBoxMain').empty();
    $("#contentBoxHeader").empty().html('Dates');

    // Definir fecha actual y nombres de los meses
    const currentDate = new Date();
    const monthNames = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"];

    const monthTitle = $('<div/>', { id: 'monthTitle' }).appendTo('#contentBoxMain');
    const leftArrow = $('<i/>', { class: 'fas fa-chevron-left cursor-pointer', id: 'prevMonth' }).appendTo(monthTitle);
    const monthText = $('<span/>').text(`${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`).appendTo(monthTitle);
    const rightArrow = $('<i/>', { class: 'fas fa-chevron-right cursor-pointer', id: 'nextMonth' }).appendTo(monthTitle);


    $('#prevMonth').click(function() {
        currentDate.setMonth(currentDate.getMonth() - 1);
        monthText.text(`${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`);
        displayCalendar(currentDate);
    });

 
    $('#nextMonth').click(function() {
        currentDate.setMonth(currentDate.getMonth() + 1);
        monthText.text(`${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`);
        displayCalendar(currentDate);
    });

    const calendarView = $('<div/>', { id: 'calendarView' }).appendTo('#contentBoxMain');

    const tasks = getTasks();
    const daysWithTasks = tasks.map(task => (new Date(task.date)).getDate());

    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

    for (let i = 0; i < 6 * 7; i++) {
        const dayElement = $('<div/>', { class: 'dayElement' });
        const firstDayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const firstDayOfMonth = firstDayDate.getDay();
        const dayNumber = i - firstDayOfMonth + 1;
        const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    
        if (i >= firstDayOfMonth && dayNumber <= daysInMonth) {
            dayElement.text(dayNumber);
            if (daysWithTasks.includes(dayNumber)) {
                dayElement.addClass('with-task');
            }
        } else {
            dayElement.addClass('outside-month');
            
            if (i < firstDayOfMonth) {
                const lastDayOfPrevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
                const dayPrevMonth = lastDayOfPrevMonth.getDate() - (firstDayOfMonth - i) + 1;
                dayElement.text(dayPrevMonth);
            } else {
        
                const dayNextMonth = dayNumber - daysInMonth;
                dayElement.text(dayNextMonth);
            }
        }
        dayElement.appendTo(calendarView);
    }
    
}


export default loadDatesModule;
