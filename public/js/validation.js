// Login validation
function validateForm() {
    var user = document.getElementById('email').value;
    var pass = document.getElementById('password').value;
    
    axios.get('https://smux-connect-default-rtdb.asia-southeast1.firebasedatabase.app/user.json?auth=AIzaSyCVi6loRRJgyBOFnoOvuTDCasJVAQYNyNk')
    .then((response) => {
        const data = response.data;
        for (const key in data) {
            if (data[key].email === user && data[key].password === pass) {
                window.sessionStorage.setItem('user', key);
                alert('Login successful');
                window.location.replace('home.html');
                return;
            }
            else {
                document.getElementById('errors').innerHTML = 'Invalid username or password';
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
        password: pass,
    })
    .then((response) => {
        const id = response.data.name;
        // Axios GET request for game items allocation
        axios.get('https://smux-connect-default-rtdb.asia-southeast1.firebasedatabase.app/item.json?auth=AIzaSyCVi6loRRJgyBOFnoOvuTDCasJVAQYNyNk')
        .then((response) => {
            const data = response.data;
            let temp_obj = {};
            for (const key in data) {
                temp_obj[key] = 0;
            }
            // Assign items to user
            axios.patch('https://smux-connect-default-rtdb.asia-southeast1.firebasedatabase.app/user/' + id + '.json?auth=AIzaSyCVi6loRRJgyBOFnoOvuTDCasJVAQYNyNk', {
                inventory: temp_obj
            });
            alert('Account created successfully');
        });
    });
}
