let taskIdCounter = 0;
let currentColumn = '';

// Modal functions
function openTaskModal(column) {
    currentColumn = column;
    const modal = document.getElementById('taskModal');
    const modalTitle = document.getElementById('modalTitle');
    const submitBtn = document.getElementById('submitBtn');

    modalTitle.textContent = 'Nova Tarefa';
    submitBtn.textContent = 'Criar Tarefa';
    document.getElementById('taskForm').reset();

    modal.classList.add('show');
    document.getElementById('taskTitle').focus();
}

function closeModal() {
    const modal = document.getElementById('taskModal');
    modal.classList.remove('show');
    document.getElementById('taskForm').reset();
}

// Fechar modal ao pressionar Esc
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Close modal when clicking outside
document.getElementById('taskModal').addEventListener('click', function (e) {
    if (e.target === this) {
        closeModal();
    }
});

// Form submission with validation
document.getElementById('taskForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const title = document.getElementById('taskTitle').value.trim();
    const description = document.getElementById('taskDescription').value.trim();
    const priority = document.getElementById('taskPriority').value;

    // Title validation
    if (!title) {
        alert('O título é obrigatório!');
        document.getElementById('taskTitle').focus();
        return;
    }

    createTask(currentColumn, title, description, priority);
    closeModal();
});

function createTask(column, title, description, priority) {
    const taskId = `task-${++taskIdCounter}`;
    const task = document.createElement('div');
    task.className = `task-card priority-${priority}`;
    task.id = taskId;
    task.dataset.priority = priority;

    task.innerHTML = `
        <div class="task-title">${title}</div>
        <div class="task-description">${description}</div>
        <div class="task-meta">
            <span class="priority-badge">Prioridade: ${getPriorityText(priority)}</span>
            <span class="created-date">${new Date().toLocaleDateString()}</span>
        </div>
    `;

    const columnEl = document.getElementById(column);
    columnEl.insertBefore(task, columnEl.firstChild);

    updateTaskCount(column);

    // Add creation animation
    setTimeout(() => {
        task.style.animation = 'slideIn 0.3s ease';
    }, 10);
}

function updateTaskCount(columnId) {
    const column = document.getElementById(columnId);
    const taskCount = column.querySelectorAll('.task-card').length;
    const countElement = document.getElementById(`${columnId}-count`);
    countElement.textContent = taskCount;
}

function getPriorityText(priority) {
    const priorities = {
        low: 'Baixa',
        medium: 'Média',
        high: 'Alta'
    };
    return priorities[priority] || 'Média';
}

// Initialize with some sample tasks
window.onload = function () {
    createTask('todo', 'Planejar reunião', 'Organizar agenda e preparar apresentação para reunião semanal', 'high');
    createTask('inprogress', 'Desenvolver API', 'Implementar endpoints para sistema de usuários', 'high');
    createTask('completed', 'Setup do projeto', 'Configurar ambiente de desenvolvimento', 'low');
    updateTaskCount('todo');
    updateTaskCount('inprogress');
    updateTaskCount('completed');
};