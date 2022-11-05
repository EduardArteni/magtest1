const username_log_in = document.getElementById('username_log_in');
const password_log_in = document.getElementById('password_log_in');
const log_in_btn = document.getElementById('log_in_btn');
const error_display_log_in = document.getElementById('error_display_log_in');

log_in_btn.addEventListener('click', logIn);

function logIn() {
    if (username_log_in.value == "" && password_log_in.value == "") {
        error_display_log_in.innerHTML = "please enter username and password";
    } else {
        error_display_log_in.innerHTML = "";
        fetch(`http://localhost:8080/login?username=${username_log_in.value}&password=${password_log_in.value}`, {
            method: 'GET',
        }).then(res => res.json()).then(data => {
            if (data.responseCode == 0) {
                
                localStorage.setItem("loggedInUserUsername", data.user.username);
                
                location.href='http://127.0.0.1:5500/my-account.html';
            } else {
                error_display_log_in.innerHTML = "incorect username or password";
            }
        });
    }
}

