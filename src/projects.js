function loadProjectsModule() {
    $('#contentBoxHeader').empty();
    $('#contentBoxMain').empty(); 
    $('#contentBoxHeader').html('Projects');
    $('#contentBoxMain').html('Projects Module Content');
}

export default loadProjectsModule;

class Project {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}
