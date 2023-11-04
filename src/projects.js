function loadProjectsModule() {
    $('#contentBox').empty(); 
    $('#contentBox').html('Projects Module Content');
}

export default loadProjectsModule;

class Project {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}
