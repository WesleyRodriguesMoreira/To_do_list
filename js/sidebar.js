// === Abrir e Fecha Sidebar ===

// Referência ao botão e ao sidebar
const taskButton = document.getElementById('open-sidebar');
const closeSidebarButton = document.getElementById('close-sidebar');
const taskSidebar = document.getElementById('taskSidebar');

// Função para abrir/fechar o sidebar com animação suave
function toggleSidebar() {
    if (taskSidebar.classList.contains('open')) {
        taskSidebar.classList.remove('open');
        taskSidebar.classList.add('closed');
        // Atraso para ocultar o sidebar após a animação
        setTimeout(() => {
            taskSidebar.style.display = 'none';
        }, 300); // Tempo deve ser o mesmo da transição (0.3s)
    } else {
        taskSidebar.style.display = 'block';
        setTimeout(() => {
            taskSidebar.classList.remove('closed');
            taskSidebar.classList.add('open');
        }, 10); // Pequeno atraso para garantir que a transição seja percebida
    }
}

// Evento de clique no botão para abrir/fechar o sidebar
taskButton.addEventListener('click', toggleSidebar);
closeSidebarButton.addEventListener('click', toggleSidebar);
