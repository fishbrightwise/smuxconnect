// Login validation
function validateForm() {
    var user = document.getElementById('username').value;
    var pass = document.getElementById('password').value;
    
    axios.get('https://smux-connect-default-rtdb.asia-southeast1.firebasedatabase.app/user.json?auth=AIzaSyCVi6loRRJgyBOFnoOvuTDCasJVAQYNyNk')
    .then((response) => {
        const data = response.data;
        for (const key in data) {
            if (data[key].email === user && data[key].password === pass) {
                alert('Login successful');
                window.location.replace('home.html');
                return;
            }
            else {
                alert("Login was unsuccessful, please check your username and password");
                return;
            }
        }
    });
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
