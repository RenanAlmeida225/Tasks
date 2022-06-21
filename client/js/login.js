const formlogin = document.querySelector('.form-login');
const formRegister = document.querySelector('.form-register');

const userName = document.querySelector('#user-name').value;
const email = document.querySelector('#email').value;
const password = document.querySelector('#password').value;
const confirmPassword = document.querySelector('#confirm-password').value;

formRegister.addEventListener('submit', handleSubmitregister);
formlogin.addEventListener('submit', handleSubmitLogin);

function handleSubmitregister(event) {
	event.preventDefault();
	window.location.assign('./tasks/tasks.html');
}

function handleSubmitLogin(event) {
	event.preventDefault();
	window.location.assign('./tasks/tasks.html');
}
