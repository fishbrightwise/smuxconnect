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
function createUser() {
    let email = document.getElementById('email').value;
    let name = document.getElementById('name').value;
    let pass = document.getElementById('pass').value;
    let cfmpass = document.getElementById('cfmpass').value;

    // Validaton

    // Axios POST request
    axios.post('https://smux-connect-default-rtdb.asia-southeast1.firebasedatabase.app/user.json?auth=AIzaSyCVi6loRRJgyBOFnoOvuTDCasJVAQYNyNk', {
        email: email,
        name: name,
        password: pass
    })
    .then(() => {
        alert('Account created successfully');
    });
}
