const tasks = document.querySelector('.tasks');
const createModal = document.querySelector('.icon-create');
const formModal = document.querySelector('.form-modal');

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
			createTasks(tasks, task.title, task.id);
		});
	});

createModal.addEventListener('click', () => {
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
	// fetch('http://localhost:5000/api/tasks', {
	// 	method: 'POST',
	// 	headers: {
	// 		Accept: 'application/json',
	// 		'Content-Type': 'application/json',
	// 		authorization: `Bearer ${localStorage.getItem('token')}`
	// 	},
	// 	body: JSON.stringify({ title: 'title' })
	// }).then((res) => {
	// 	console.log(res.json());
	// });
	//createTasks(tasks);
	//window.location.assign('./teste.html');
});

formModal.addEventListener('submit', (event) => {
	event.preventDefault();
	const title = document.querySelector('#title-modal');

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

function deleteTask(taskId) {
	console.log(taskId);
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

function createTasks(element, title, taskId) {
	const node = `<div class="task">\n\
    <div class="title">\n\
        <span>${title}</span>\n\
    </div>\n\
    <div class="icons">\n\
        <div class="icon icon-check">\n\
            <button>\n\
                <i class="bi bi-check-square"></i>\n\
                <!-- <i class="bi bi-square"></i> -->\n\
            </button>\n\
        </div>\n\
        <div class="icon icon-edit">\n\
            <button>\n\
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
