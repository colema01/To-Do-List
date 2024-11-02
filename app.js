// Function to add a new task
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const dueDateInput = document.getElementById('dueDateInput');
    const taskText = taskInput.value.trim();
    const dueDate = dueDateInput.value;

    if (taskText === '') {
        alert('Please enter a task.');
        return;
    }

    const taskList = document.getElementById('taskList');

    const listItem = document.createElement('li');
    const taskTextNode = document.createTextNode(taskText);

    listItem.appendChild(taskTextNode);

    if (dueDate) {
        const dueDateNode = document.createElement('span');
        dueDateNode.innerText = ` - Due: ${dueDate}`;
        dueDateNode.classList.add('due-date');
        listItem.appendChild(dueDateNode);
    }

    const removeBtn = document.createElement('button');
    removeBtn.innerText = 'Remove';
    removeBtn.onclick = () => {
        if (confirm('Are you sure you want to remove this task?')) {
            removeTask(listItem);
        }
    };
    listItem.appendChild(removeBtn);

    // Add toggle completion functionality
    listItem.onclick = (event) => {
        if (event.target !== removeBtn) { // Avoid marking as complete when clicking 'Remove'
            toggleComplete(listItem);
        }
    };

    taskList.appendChild(listItem);
    taskInput.value = '';
    dueDateInput.value = '';

    updateTaskCount();
}

// Function to remove a task
function removeTask(taskItem) {
    taskItem.remove();
    updateTaskCount();
}

// Function to mark a task as completed and update count
function toggleComplete(taskItem) {
    taskItem.classList.toggle('completed');
    updateTaskCount();
}

// Function to update task count display
function updateTaskCount() {
    const taskList = document.getElementById('taskList');
    const uncompletedTasks = Array.from(taskList.getElementsByTagName('li')).filter(
        task => !task.classList.contains('completed')
    ).length;
    document.getElementById('taskCount').innerText = `Tasks remaining: ${uncompletedTasks}`;
}

// Function to update the clock
function updateClock() {
    const clockElement = document.getElementById('clock');
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    clockElement.innerText = `${hours}:${minutes}:${seconds}`;
}

// Function to check and highlight overdue tasks
function checkOverdueTasks() {
    const taskList = document.getElementById('taskList');
    const now = new Date();

    Array.from(taskList.getElementsByTagName('li')).forEach(taskItem => {
        const dueDateText = taskItem.querySelector('.due-date');
        
        if (dueDateText) {
            const dueDate = new Date(dueDateText.innerText.replace(' - Due: ', ''));
            if (dueDate < now && !taskItem.classList.contains('completed')) {
                taskItem.style.color = 'red'; // Highlight overdue tasks in red
            } else {
                taskItem.style.color = 'black'; // Reset color if not overdue
            }
        }
    });
}

// Update the clock and check for overdue tasks every second
setInterval(() => {
    updateClock();
    checkOverdueTasks();
}, 1000);

document.getElementById('addTaskBtn').addEventListener('click', addTask);
document.getElementById('taskInput').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        addTask();
    }
});

updateTaskCount();
