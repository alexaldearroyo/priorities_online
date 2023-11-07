import { saveTask, getTasks } from "./localStorage.js";



// Possible future implementation
export function loadPrioritiesModule() {
    $('#contentBoxHeader').empty();
    $('#contentBoxMain').empty(); 
    $('#contentBoxHeader').html('Priorities');
    $('#contentBoxMain').html('Priorities Module Content');
}

