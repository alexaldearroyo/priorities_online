function loadTasksModule() {
    $('#contentBox').empty(); 
    $('#contentBox').html('Tasks Module Content');
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
