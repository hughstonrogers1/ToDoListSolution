// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

function deleteButton(button) {
    debugger;
    const taskItem = button.closest('li');
    const taskLabel = taskItem.querySelector('.task-label').innerText;

    if (taskItem) {
        const formData = new URLSearchParams();
        formData.append('TaskDescription', taskLabel);

        fetch('/ToDo/DeleteTask', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'RequestVerificationToken': document.querySelector('input[name="__RequestVerificationToken"]').value 
            },
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    taskItem.remove();
                } else {
                    alert('Failed to delete task.');
                }
            })
            .catch(error => console.error('Error:', error));
    }
}

function openEditModal(taskText) {
    document.getElementById("editTaskInput").value = taskText; 
    document.getElementById("editTaskId").value = taskText; 
    var editModal = new bootstrap.Modal(document.getElementById("editTaskModal"));
    editModal.show();
}

function saveTask() {
    debugger;
    let originalTask = document.getElementById("editTaskId").value; 
    let editedTask = document.getElementById("editTaskInput").value; 

    if (!editedTask.trim()) {
        alert("Task cannot be empty.");
        return;
    }

    const formData = new URLSearchParams();
    formData.append('OriginalTask', originalTask);
    formData.append('EditedTask', editedTask);

    fetch('/ToDo/EditTask', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'RequestVerificationToken': document.querySelector('input[name="__RequestVerificationToken"]').value 
        },
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {

                let taskLabels = document.querySelectorAll('.task-label');
                taskLabels.forEach(label => {
                    if (label.innerText === originalTask) {
                        label.innerText = editedTask;
                    }
                });

                var editModal = bootstrap.Modal.getInstance(document.getElementById("editTaskModal"));
                editModal.hide();
            } else {
                alert('Failed to update task.');
            }
        })
        .catch(error => console.error('Error:', error));
}
