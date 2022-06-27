const formlogin = document.querySelector('.form-login');
const formRegister = document.querySelector('.form-register');

formRegister.addEventListener('submit', handleSubmitregister);
formlogin.addEventListener('submit', handleSubmitLogin);

function handleSubmitregister(event) {
	event.preventDefault();
	window.location.assign('./tasks/tasks.html');
}

function handleSubmitLogin(event) {
	event.preventDefault();
	const email = document.querySelector('#email-login').value;
	const password = document.querySelector('#password-login').value;

	fetch('http://localhost:5000/api/auth/login', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ email: email, password: password })
	})
		.then((res) => {
			return res.json();
		})
		.then((data) => {
			if (data.token) {
				localStorage.setItem('token', data.token);
				location.assign('./tasks/tasks.html');
			}
		})
		.catch((error) => console.error(error));
}
