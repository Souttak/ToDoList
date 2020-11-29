window.localStorage;

/* 
Sé que hacer esto no es muy buena práctica, y es conveniente usar objetos generados con
document.createElement porque es mejor y más dinámico, pero para algo tan simple tampoco 
pasa nada, y me ahorra trabajo.
*/
const checkbox = "<input type='checkbox' name='taskDone' class='taskCheckBox'>";
const deleteButton = "<button class='deleteTaskButton' aria-label='Delete the task'><img class='buttonIMG' alt='Bin icon' src='./img/bx-trash.svg' onclick='removeTask(this)'></button>";
const shareButton = "<button class='shareTaskButton' aria-label='Share the task'><img class='buttonIMG' alt='Share icon' src='./img/bx-share-alt.svg' onclick='shareTask(this)'></button>";
const copyButton = "<button class='copyTaskButton' aria-label='Copy the task to clipboard'><img class='buttonIMG' alt='Clipboard icon' src='./img/bx-clipboard.svg' onclick='copyTask(this)'></button>";

var isFullscreenEnabled = false;

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

function fullscreen(reference){
    if(document.fullscreenEnabled){
        if(isFullscreenEnabled){
            document.exitFullscreen();
            reference.closest("header").innerHTML = "<h1>TASK LIST</h1>\n<button class='fullscreenButton' aria-label='Activate/deactivate fullscreen'><img class='buttonIMG' alt='Fullscreen icon' src='./img/bx-fullscreen.svg' onclick='fullscreen(this)'></button>";
            isFullscreenEnabled = !isFullscreenEnabled;
        }else{
            document.getElementById("taskListMainPage").requestFullscreen();
            reference.closest("header").innerHTML = "<h1>TASK LIST</h1>\n<button class='fullscreenButton' aria-label='Activate/deactivate fullscreen'><img class='buttonIMG' alt='Exit fullscreen icon' src='./img/bx-exit-fullscreen.svg' onclick='fullscreen(this)'></button>";
            isFullscreenEnabled = !isFullscreenEnabled;
        }
    }else{
        alert("Your browser doesn't support fullscreen mode.");
    }
}