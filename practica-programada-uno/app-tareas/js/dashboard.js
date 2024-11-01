document.addEventListener('DOMContentLoaded', function () {

  let isEditMode = false;
  let edittingId;
  const tasks = [{
    id: 1,
    title: "Complete project report",
    description: "Prepare and submit the project report",
    dueDate: "2024-12-01",
    comments: []
  },
  {
    id: 2,
    title: "Team Meeting",
    description: "Get ready for the season",
    dueDate: "2024-12-01",
    comments: []
  },
  {
    id: 3,
    title: "Code Review",
    description: "Check partners code",
    dueDate: "2024-12-01",
    comments: []
  },
  {
    id: 4,
    title: "Deploy",
    description: "Check deploy steps",
    dueDate: "2024-12-01",
    comments: []
  }];


  function loadTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
    tasks.forEach(function (task) {
      const taskCard = document.createElement('div');
      taskCard.className = 'col-md-4 mb-3';
      taskCard.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${task.title}</h5>
                    <p class="card-text">${task.description}</p>
                    <p class="card-text"><small class="text-muted">Due: ${task.dueDate}</small> </p>
                </div>
                <div class="card-footer d-flex justify-content-between">
                    <button class="btn btn-secondary btn-sm edit-task" data-id="${task.id}">Edit</button>
                    <button class="btn btn-danger btn-sm delete-task" data-id="${task.id}">Delete</button>
                </div>
                <button class="btn btn-link add-comment-btn" data-bs-toggle="modal" data-bs-target="#commentModal" data-id="${task.id}" >Add comment</button>
                <div class="card-body">
                    ${task.comments.map((c, i) => `
                        <div class="d-flex justify-content-between align-items-center mb-1">
                        <span>${c.comment}</span>
                        <button class="btn btn-sm text-danger delete-comment" data-comment-id="${c.id}" data-task-id="${task.id}" >
                          <i class="fas fa-trash" data-comment-id="${c.id}" data-task-id="${task.id}"></i>
                        </button>
                        </div> `).join('')}
                </div>
            </div>
            `;


      taskList.appendChild(taskCard);
    });

    document.querySelectorAll('.edit-task').forEach(function (button) {
      button.addEventListener('click', handleEditTask);
    });

    document.querySelectorAll('.delete-task').forEach(function (button) {
      button.addEventListener('click', handleDeleteTask);
    });

    document.querySelectorAll('.add-comment-btn').forEach((b) => b.addEventListener('click', (event) => {
      const taskId = parseInt(event.target.dataset.id);
      const task = tasks.find(t => t.id === taskId);
      console.log(task);
      edittingId = taskId;
    }))

    document.querySelectorAll('.delete-comment').forEach((b) => b.addEventListener('click', (event) => {
      console.log(event.target.dataset)
      const commentId = parseInt(event.target.dataset.commentId)
      const taskId = parseInt(event.target.dataset.taskId);
      const task = tasks.find(t => t.id === taskId);
      const index = task.comments.findIndex(c => c.id === commentId);
      task.comments.splice(index, 1);
      loadTasks();
    }))

  }

  function handleEditTask(event) {
    try {
      // alert(event.target.dataset.id);
      //localizar la tarea quieren editar
      const taskId = parseInt(event.target.dataset.id);
      const task = tasks.find(t => t.id === taskId);
      //cargar los datos en el formulario 
      document.getElementById('task-title').value = task.title;
      document.getElementById('task-desc').value = task.description;
      document.getElementById('due-date').value = task.dueDate;
      //ponerlo en modo edicion
      isEditMode = true;
      edittingId = taskId;
      //mostrar el modal
      const modal = new bootstrap.Modal(document.getElementById("taskModal"));
      modal.show();
    } catch (error) {
      alert("Error trying to edit a task");
      console.error(error);
    }
  }

  function handleDeleteTask(event) {
    // alert(event.target.dataset.id);
    const id = parseInt(event.target.dataset.id);
    const index = tasks.findIndex(t => t.id === id);
    tasks.splice(index, 1);
    loadTasks();
  }

  document.getElementById('task-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const title = document.getElementById("task-title").value;
    const description = document.getElementById("task-desc").value;
    const dueDate = document.getElementById("due-date").value;

    if (isEditMode) {
      //todo editar
      const task = tasks.find(t => t.id === edittingId);
      task.title = title;
      task.description = description;
      task.dueDate = dueDate;
    } else {
      const newTask = {
        id: tasks.length + 1,
        title: title,
        description: description,
        dueDate: dueDate
      };
      tasks.push(newTask);
    }
    const modal = bootstrap.Modal.getInstance(document.getElementById('taskModal'));
    modal.hide();
    loadTasks();
  });

  document.getElementById('taskModal').addEventListener('show.bs.modal', function () {
    if (!isEditMode) {
      document.getElementById('task-form').reset();
    }
  });

  document.getElementById("taskModal").addEventListener('hidden.bs.modal', function () {
    edittingId = null;
    isEditMode = false;
  });

  document.getElementById('comment-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const comment = document.getElementById("comment-input").value;
    console.log(comment);
    const task = tasks.find(t => t.id === edittingId);
    const lastCommentId = task.comments.length > 0 ? task.comments[task.comments.length - 1].id : 0;
    task.comments.push({ comment, id: lastCommentId + 1 });
    const modal = bootstrap.Modal.getInstance(document.getElementById('commentModal'));
    modal.hide();
    loadTasks();
    edittingId = undefined;
  });

  document.getElementById('commentModal').addEventListener('show.bs.modal', function () {
    document.getElementById('comment-form').reset();
  });

  document.getElementById("comment-form").addEventListener('hidden.bs.modal', function () {
    edittingId = undefined;
  });

  loadTasks();

});