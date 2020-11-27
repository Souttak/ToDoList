window.localStorage;

/* 
    Sé que hacer esto no es muy buena práctica, y es conveniente usar objetos generados con
    document.createElement porque es mejor y más dinámico, pero para algo tan simple tampoco 
    pasa nada, y me ahorra trabajo.
*/
const checkbox = "<input type='checkbox' name='taskDone' class='taskCheckBox'>";
const deleteButton = "<button class='deleteTaskButton'><img class='buttonIMG' src='/img/bx-trash.svg' onclick='removeTask(this)'></button>";
const shareButton = "<button class='shareTaskButton'><img class='buttonIMG' src='/img/bx-share-alt.svg' onclick='shareTask(this)'></button>";
const copyButton = "<button class='copyTaskButton'><img class='buttonIMG' src='/img/bx-clipboard.svg' onclick='copyTask(this)'></button>";

function addTask(){
    var taskList = document.getElementById("taskList");
    var taskInput = document.getElementById("taskInput");

    if(taskInput.value != "" && taskInput.value != null){
        var newTask = document.createElement("li");
        newTask.innerHTML = checkbox + taskInput.value + "<div class='liButtonsDiv'>" + copyButton + shareButton + deleteButton + "</div>";
        taskList.appendChild(newTask);
        saveTasks(taskList);
    }
}

function removeTask(task){
    task.closest("li").remove();
    saveTasks(document.getElementById("taskList"));
}

function saveTasks(taskList){
    localStorage.setItem("tasks", taskList.innerHTML);
}

function loadTasks(){
    var taskList = document.getElementById("taskList");
    var storedTaskList = localStorage.getItem("tasks");
    if(storedTaskList != null){
        taskList.innerHTML = storedTaskList;
    }
}

function shareTask(reference){

}

function copyTask(reference){
    var taskText = reference.closest("li").innerText;
    navigator.clipboard.writeText(taskText);
}