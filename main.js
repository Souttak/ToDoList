window.localStorage;

/* 
Sé que hacer esto no es muy buena práctica, y es conveniente usar objetos generados con
document.createElement porque es mejor y más dinámico, pero para algo tan simple tampoco 
pasa nada, y me ahorra trabajo.
*/
const checkbox = "<input type='checkbox' name='taskDone' class='taskCheckBox'>";
const deleteButton =
    "<button class='deleteTaskButton' aria-label='Delete the task'><img class='buttonIMG' alt='Bin icon' src='./img/bx-trash.svg' onclick='removeTask(this)'></button>";
const shareButton =
    "<button class='shareTaskButton' aria-label='Share the task'><img class='buttonIMG' alt='Share icon' src='./img/bx-share-alt.svg' onclick='shareTask(this)'></button>";
const copyButton =
    "<button class='copyTaskButton' aria-label='Copy the task to clipboard'><img class='buttonIMG' alt='Clipboard icon' src='./img/bx-clipboard.svg' onclick='copyTask(this)'></button>";

let isFullscreenEnabled = false;

function addTask() {
    let taskList = document.getElementById("taskList");
    let taskInput = document.getElementById("taskInput");

    if (taskInput.value != "" && taskInput.value != null) {
        let newTask = document.createElement("li");
        newTask.innerHTML =
            checkbox +
            taskInput.value +
            "<div class='liButtonsDiv'>" +
            copyButton +
            shareButton +
            deleteButton +
            "</div>";
        taskList.appendChild(newTask);

        let coords = navigator.geolocation.getCurrentPosition((position) => {
            return {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            };
        });

        saveTasks({ item: newTask, location: coords });
    }
}

function removeTask(task) {
    task.closest("li").remove();
    let storedTasks = localStorage.getItem("tasks");
    storedTasks.forEach((element) => {
        if (element.item == task) {
            storedTasks.splice(storedTasks.indexOf(element), 1);
            localStorage.setItem("tasks", storedTasks);
        }
    });
}

function saveTasks(task) {
    let storedTasks = localStorage.getItem("tasks");
    storedTasks == null ? (storedTasks = [task]) : storedTasks.push(task);
    localStorage.setItem("tasks", storedTasks);
}

function loadTasks() {
    let taskList = document.getElementById("taskList");
    let storedTasks = localStorage.getItem("tasks");
    if (storedTasks != null) {
        storedTasks.forEach((task) => {
            taskList.appendChild(task);
        });
    }
}

function shareTask(reference) {}

function copyTask(reference) {
    let taskText = reference.closest("li").innerText;
    navigator.clipboard.writeText(taskText);
}

function fullscreen(reference) {
    if (document.fullscreenEnabled) {
        if (isFullscreenEnabled) {
            document.exitFullscreen();
            reference.closest("header").innerHTML =
                "<h1>TASK LIST</h1>\n<button class='fullscreenButton' aria-label='Activate/deactivate fullscreen'><img class='buttonIMG' alt='Fullscreen icon' src='./img/bx-fullscreen.svg' onclick='fullscreen(this)'></button>";
            isFullscreenEnabled = !isFullscreenEnabled;
        } else {
            document.getElementById("taskListMainPage").requestFullscreen();
            reference.closest("header").innerHTML =
                "<h1>TASK LIST</h1>\n<button class='fullscreenButton' aria-label='Activate/deactivate fullscreen'><img class='buttonIMG' alt='Exit fullscreen icon' src='./img/bx-exit-fullscreen.svg' onclick='fullscreen(this)'></button>";
            isFullscreenEnabled = !isFullscreenEnabled;
        }
    } else {
        alert("Your browser doesn't support fullscreen mode.");
    }
}
