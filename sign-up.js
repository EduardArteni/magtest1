const username_sign_up = document.getElementById('username_sign_up');
const password_sign_up = document.getElementById('password_sign_up');
const sign_up_btn = document.getElementById('sign_up_btn');
const error_display_sign_up = document.getElementById('error_display_sign_up');

sign_up_btn.addEventListener('click', signUp);

//localhost:8080/user?username=test&password=test

function signUp() {
    if (username_sign_up.value == "" && password_sign_up.value == "") {
        error_display_sign_up.innerHTML = "please enter username and password";
    } else {
        error_display_sign_up.innerHTML = "";
        fetch(`http://localhost:8080/user?username=${username_sign_up.value}&password=${password_sign_up.value}`, {
            method: 'POST',
        }).then(res => res.json()).then(data => {
            if (data.responseCode == 0) {
                
                localStorage.setItem("loggedInUserUsername", data.user.username);
                
                location.href='http://127.0.0.1:5500/my-account.html';
            } else if (data.responseCode == 501) {
                error_display_sign_up.innerHTML = "username already taken";
            }else{
				error_display_sign_up.innerHTML = "error try again";
			}
        });
    }
}


