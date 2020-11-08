function addTask(){
    var taskList = document.getElementById("taskList");
    var taskInput = document.getElementById("taskInput");

    /* 
        Sé que hacer esto no es muy buena práctica, y es conveniente usar objetos generados con
        document.createElement es mejor y más dinámico, pero para algo tan simple tampoco pasa
        nada, y me ahorra trabajo.
    */
    const checkbox = "<input type='checkbox' name='taskDone' class='taskCheckBox'>";
    const deleteButton = "<button class='deleteTaskButton'><img src='/img/bx-trash.svg' onclick='removeTask()'></button>";

    if(taskInput.value != "" && taskInput.value != null){
        var newTask = document.createElement("li");
        newTask.innerHTML = checkbox + taskInput.value + deleteButton;
        taskList.appendChild(newTask);
    }
}

function removeTask(task){
    var taskList = document.getElementById("taskList");
    taskList.removeChild(task);
}