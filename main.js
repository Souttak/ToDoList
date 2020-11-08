var counter = 0;

function addTask(){
    var taskList = document.getElementById("taskList");
    var taskInput = document.getElementById("taskInput");

    const checkbox = "<input type=\"checkbox\" name=\"taskDone\" class=\"taskCheckBox\">";
    const deleteButton = "<button class=\"deleteTaskButton\"><img src=\"/img/bx-trash.svg\"></button>";

    var counter;

    if(taskInput.value != "" && taskInput.value != null){
        var newTask = document.createElement("li");
        newTask.innerHTML = checkbox + taskInput.value + deleteButton;
        taskList.appendChild(newTask);
    }
}

function removeTask(){
    var taskList = document.getElementById("taskList");
}