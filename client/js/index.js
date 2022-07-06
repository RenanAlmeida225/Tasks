const tasks = document.querySelector('.tasks');
const createModal = document.querySelector('.icon-create');
const formModal = document.querySelector('.form-modal');

window.addEventListener('load', () => {
	fetch('http://localhost:5000/api/tasks', {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			authorization: `Bearer ${localStorage.getItem('token')}`
		}
	})
		.then((res) => {
			return res.json();
		})
		.then((data) => {
			const dataTasks = data.tasks;

			dataTasks.map((task) => {
				createTasks(tasks, task.title, task.id, task.complete);
			});
		});
});

createModal.addEventListener('click', () => {
	const title = document.querySelector('#title-modal');
	title.value = '';
	openModel();
	formModal.addEventListener('submit', (event) => {
		event.preventDefault();
		if (title.value !== '') {
			fetch('http://localhost:5000/api/tasks', {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					authorization: `Bearer ${localStorage.getItem('token')}`
				},
				body: JSON.stringify({ title: title.value })
			}).then((res) => {
				return res.json();
			});

			title.value = '';
		}
	});
});

function openModel() {
	const modal = document.querySelector('.modal-container');

	modal.style.display = 'flex';
	modal.addEventListener('click', ({ target }) => {
		if (
			target.className === 'close' ||
			target.className === 'modal-container'
		) {
			modal.style.display = 'none';
		}
	});
}

function editTask(title, taskId) {
	openModel();
	const titleModal = document.querySelector('#title-modal');
	titleModal.value = title;

	formModal.addEventListener('submit', (event) => {
		event.preventDefault();
		if (titleModal.value !== '') {
			fetch(`http://localhost:5000/api/tasks/${taskId}`, {
				method: 'PUT',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					authorization: `Bearer ${localStorage.getItem('token')}`
				},
				body: JSON.stringify({ title: titleModal.value })
			}).then((res) => {
				return res.json();
			});
		}
	});
}

function deleteTask(taskId) {
	fetch(`http://localhost:5000/api/tasks/${taskId}`, {
		method: 'DELETE',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			authorization: `Bearer ${localStorage.getItem('token')}`
		}
	}).then((res) => {
		return res.json();
	});
}

function completeTasks(taskId) {
	fetch(`http://localhost:5000/api/tasks/complete/${taskId}`, {
		method: 'PUT',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			authorization: `Bearer ${localStorage.getItem('token')}`
		}
	})
		.then((res) => {
			return res.json();
		})
		.then((data) => {
			console.log(data.complete);
		});
}

function createTasks(element, title, taskId, complete) {
	let iscomplete = complete
		? '<div class="task complete">'
		: '<div class="task">';

	let boxCheck = complete ? 'check-square' : 'square';

	console.log('==>', complete, '\n==>', iscomplete);
	const node = `${iscomplete}\n\
    <div class="title">\n\
        <span>${title}</span>\n\
    </div>\n\
    <div class="icons">\n\
        <div class="icon icon-check">\n\
            <button onclick = "completeTasks(${taskId})">\n\
				<i class="bi bi-${boxCheck}"></i>\n\
            </button>\n\
        </div>\n\
        <div class="icon icon-edit">\n\
            <button onclick="editTask('${title}', ${taskId})">\n\
                <i class="bi bi-pencil-square"></i>\n\
            </button>\n\
        </div>\n\
        <div class="icon icon-delete">\n\
            <button onclick="deleteTask(${taskId})">\n\
                <i class="bi bi-trash"></i>\n\
            </button>\n\
        </div>\n\
    </div>\n\
</div>`;
	element.insertAdjacentHTML('beforeend', node);
}
