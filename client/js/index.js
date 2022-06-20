import aadd from './createTasks';

const createButton = document.querySelector('.icon-create');
const tasks = document.querySelector('.tasks');

createButton.addEventListener('click', () => {
	createTasks(tasks);
	aadd();
});

function createTasks(element) {
	const node =
		'<div class="task">\n\
    <div class="title">\n\
        <span>Teste de tasks</span>\n\
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
            <button>\n\
                <i class="bi bi-trash"></i>\n\
            </button>\n\
        </div>\n\
    </div>\n\
</div>';
	element.insertAdjacentHTML('beforeend', node);

	console.log('here!');
}