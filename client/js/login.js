const formlogin = document.querySelector('.form-login');
const formRegister = document.querySelector('.form-register');

formRegister.addEventListener('submit', handleSubmitregister);
formlogin.addEventListener('submit', handleSubmitLogin);

function handleSubmitregister(event) {
	event.preventDefault();
	const email = document.querySelector('#email').value;
	const password = document.querySelector('#password').value;

	console.log(`emial = ${email}, password = ${password}`);
	window.location.assign('./tasks/tasks.html');
}

function handleSubmitLogin(event) {
	event.preventDefault();
	const email = document.querySelector('#email').value;
	const password = document.querySelector('#password').value;

	console.log(`emial = ${email}, password = ${password}`);
	window.location.assign('./tasks/tasks.html');
}
