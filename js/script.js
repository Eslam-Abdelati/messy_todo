  let tasks = [];

    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");
    const addTaskBtn = document.getElementById("addTaskBtn");

    // Add new task
    function addTask() {
      const taskName = taskInput.value.trim();
      if (!taskName) return;

      const newId = tasks.length === 0 ? 1 : tasks[tasks.length - 1].id + 1;
      const newTask = {
        id: newId,
        name: taskName,
        done: false
      };

      tasks.push(newTask);
      taskInput.value = "";
      renderTasks();
    }

    // Toggle task completion
    function toggleTask(id) {
      tasks = tasks.map(task =>
        task.id === id ? { ...task, done: !task.done } : task
      );
      renderTasks();
    }

    // Delete task
    function deleteTask(id) {
      tasks = tasks.filter(task => task.id !== id);
      renderTasks();
    }

    // Render the task list
    function renderTasks() {
      taskList.innerHTML = "";
      tasks.forEach(task => {
        const li = document.createElement("li");
        li.className = task.done ? "done" : "";

        li.innerHTML = `
          <span>${task.name}</span>
          <div>
            <button class="btn toggle-btn" onclick="toggleTask(${task.id})">Toggle</button>
            <button class="btn delete-btn" onclick="deleteTask(${task.id})">Delete</button>
          </div>
        `;

        taskList.appendChild(li);
      });
    }

    // Check if all tasks are done every 10 seconds
    setInterval(() => {
      const allDone = tasks.length > 0 && tasks.every(task => task.done);
      if (allDone) {
        console.log("✅ All tasks done!");
      }
    }, 10000);

    // Event listener for Add button
    addTaskBtn.addEventListener("click", addTask);

    // Add task on Enter key
    taskInput.addEventListener("keydown", e => {
      if (e.key === "Enter") addTask();
    });


    
