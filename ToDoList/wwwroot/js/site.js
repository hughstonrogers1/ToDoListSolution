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
                'RequestVerificationToken': document.querySelector('input[name="__RequestVerificationToken"]').value // for CSRF protection
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
