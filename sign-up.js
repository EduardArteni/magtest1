const username_sign_up = document.getElementById('username_sign_up');
const password_sign_up = document.getElementById('password_sign_up');
const sign_up_btn = document.getElementById('sign_up_btn');
const error_display_sign_up = document.getElementById('error_display_sign_up');

sign_up_btn.addEventListener('click', signUp);

function signUp() {
	fetch(`http://localhost:8080/user?username=${username_sign_up.value}&password=${password_sign_up.value}`, {
  		method: 'POST',
	}).then(res => res.json()).then(data => {
		//do something here lol
	});
}

