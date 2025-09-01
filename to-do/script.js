function addTask() {
    const taskInput = document.getElementById('taskInput').value.trim();
    if (taskInput === '') return;

    const createdAt = new Date().toLocaleString('en-US', { 
        timeZone: 'Asia/Kolkata',
        dateStyle: 'medium',
        timeStyle: 'short'
    });

    const li = document.createElement('li');
    li.innerHTML = `
        <div class="task-content">
            <span class="task-text">${taskInput}</span>
            <small>(Added: ${createdAt})</small>
        </div>
        <div>
            <button class="complete-btn" onclick="markComplete(this)">Complete</button>
            <button class="edit-btn" onclick="editTask(this)">Edit</button>
            <button class="delete-btn" onclick="deleteTask(this)">Delete</button>
        </div>
    `;

    document.getElementById('pendingList').appendChild(li);
    document.getElementById('taskInput').value = '';
}

function markComplete(button) {
    const li = button.parentElement.parentElement;
    const taskText = li.querySelector('.task-text').textContent;
    const createdAt = li.querySelector('small').textContent.match(/Added: (.*)/)[1];
    const completedAt = new Date().toLocaleString('en-US', { 
        timeZone: 'Asia/Kolkata',
        dateStyle: 'medium',
        timeStyle: 'short'
    });

    const newLi = document.createElement('li');
    newLi.className = 'completed';
    newLi.innerHTML = `
        <div class="task-content">
            <span class="task-text">${taskText}</span>
            <small>(Added: ${createdAt}, Completed: ${completedAt})</small>
        </div>
        <div>
            <button class="edit-btn" onclick="editTask(this)">Edit</button>
            <button class="delete-btn" onclick="deleteTask(this)">Delete</button>
        </div>
    `;

    document.getElementById('completedList').appendChild(newLi);
    li.remove();
}
