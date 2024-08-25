// Referências aos elementos
const taskForm = document.getElementById('task-form-cad');
const taskTableBody = document.getElementById('taskTable').querySelector('tbody');
const taskMessage = document.getElementById('task-p'); 

// Carrega tarefas ao iniciar
document.addEventListener('DOMContentLoaded', loadTasks);

// Evento de envio do formulário
taskForm.addEventListener('submit', function(event) {
    event.preventDefault();
    addTask();
});

// Função para carregar tarefas
function loadTasks() {
    const tasks = getTasks();
    taskTableBody.innerHTML = '';

    if(tasks.length === 0){
        taskMessage.style.display = 'block';
        document.querySelector('.select-taks').style.display = 'none';
    }else{
        taskMessage.style.display = 'none';
        document.querySelector('.select-taks').style.display = 'block';
        tasks.forEach(task => insertTaskIntoTable(task));
    }
}

// Função para obter tarefas do localStorage
function getTasks() {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

// Função para cadastra tarefas no localStorage
function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// === Função para adicionar uma tarefa ===
function addTask() {
    const name = document.getElementById('name_task').value;
    const description = document.getElementById('description_task').value;
    
    const tasks = getTasks();
    const id = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;
    
    const task = { id, name, description };
    tasks.push(task);
    saveTasks(tasks);
    insertTaskIntoTable(task);
    
    // Atualiza a exibição após adicionar uma tarefa
    loadTasks();

    // Limpar o formulário
    taskForm.reset();
}

// === Função para inserir uma tarefa na tabela ===
function insertTaskIntoTable(task) {
    const row = taskTableBody.insertRow();
    row.innerHTML = `
        <td>${task.id}</td>
        <td>${task.name}</td>
        <td>${task.description}</td>
        <td>
            <button onclick="editTask(${task.id})">Editar</button>
            <button onclick="deleteTask(${task.id})">Excluir</button>
        </td>
    `;
}

// === Função para editar uma tarefa ===
function editTask(id) {
    const tasks = getTasks();
    const task = tasks.find(task => task.id === id);

    document.getElementById('name').value = task.name;
    document.getElementById('description').value = task.description;

    deleteTask(id); // Remove a tarefa antiga para evitar duplicação
}

// === Função para excluir uma tarefa ===
function deleteTask(id) {

    const confirmation = confirm("Tem certeza que deseja excluir esta tarefa?");
    
    if(confirmation){ 
        let tasks = getTasks();
        tasks = tasks.filter(task => task.id !== id);
        saveTasks(tasks);
        loadTasks();
    } 
    
}
