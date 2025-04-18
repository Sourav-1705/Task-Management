// Firebase configuration (Replace with your Firebase configuration)
const firebaseConfig = {
  apiKey: "AIzaSyBm3-6_pv-YYfhlH_vsuhhIT86nDBY7iKY",
  authDomain: "ampl-task-manager.firebaseapp.com",
  databaseURL: "https://ampl-task-manager-default-rtdb.firebaseio.com",
  projectId: "ampl-task-manager",
  storageBucket: "ampl-task-manager.appspot.com",
  messagingSenderId: "386712165446",
  appId: "1:386712165446:web:85e734538594491f33be47",
};

const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Handle form submission to add tasks
document.getElementById('taskForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const taskTitle = document.getElementById('taskTitle').value;
  const taskDetails = document.getElementById('taskDetails').value;
  const assignedTo = document.getElementById('assignedTo').value;
  const priority = document.getElementById('priority').value;

  if (taskTitle && taskDetails && assignedTo && priority) {
    const newTaskRef = database.ref('tasks').push();
    const newTask = {
      title: taskTitle,
      details: taskDetails,
      assignedTo: assignedTo,
      priority: priority,
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    newTaskRef.set(newTask).then(() => {
      alert("Task assigned successfully!");
      document.getElementById('taskForm').reset();
      loadTasks();
    });
  }
});

// Function to load tasks from Firebase
function loadTasks() {
  const tasksRef = database.ref('tasks');
  tasksRef.once('value', function(snapshot) {
    const tasks = snapshot.val();
    const tasksContainer = document.getElementById('tasks');
    tasksContainer.innerHTML = ''; // Clear the current task list

    for (const taskId in tasks) {
      const task = tasks[taskId];
      const taskElement = document.createElement('div');
      taskElement.classList.add('task-item');
      taskElement.innerHTML = `
        <h3>${task.title}</h3>
        <p>${task.details}</p>
        <p><strong>Assigned to:</strong> ${task.assignedTo}</p>
        <p><strong>Priority:</strong> ${task.priority}</p>
        <p class="status ${task.status.toLowerCase()}">${task.status}</p>
      `;
      tasksContainer.appendChild(taskElement);
    }
  });
}

// Initial load of tasks when the page is loaded
window.onload = loadTasks;