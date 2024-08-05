// Login validation
function validateForm() {
    window.location.href = "home.html";
}



// Register validation
var email = document.forms['regForm']['email'];
var username = document.forms['regForm']['username'];
var password = document.forms['regForm']['password'];
var password_confirm = document.forms['regForm']['confirmPass'];
var name_error = document.getElementById('name_error');
// Add your custom validation logic here
