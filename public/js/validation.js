// Login validation
function validateForm() {
    var user = document.getElementById('username').value;
    var pass = document.getElementById('password').value;
    var username = "username";
    var password = "password";

    if (user === username && pass === password) {
        // Redirect to home.html
        window.location.replace('home.html')
    } else {
        alert("Login was unsuccessful, please check your username and password");
        return false;
    }
}

// Register validation
var email = document.forms['regForm']['email'];
var username = document.forms['regForm']['username'];
var password = document.forms['regForm']['password'];
var password_confirm = document.forms['regForm']['confirmPass'];
var name_error = document.getElementById('name_error');
// Add your custom validation logic here
