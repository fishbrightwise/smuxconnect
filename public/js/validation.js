// Login validation
function validateForm() {
    var user = document.getElementById('email').value;
    var pass = document.getElementById('password').value;
    
    axios.get('https://smux-connect-default-rtdb.asia-southeast1.firebasedatabase.app/user.json?auth=' + firebaseAPIKey.API_KEY)
    .then((response) => {
        const data = response.data;
        for (const key in data) {
            if (data[key].email === user && data[key].password === pass) {
                window.sessionStorage.setItem('user', key);
                window.sessionStorage.setItem('name', data[key].name);
                alert('Login successful');
                window.location.replace('home.html');
                return;
            }
        }
        document.getElementById('errors').innerHTML = 'Invalid username or password';
        return;
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
    axios.post('https://smux-connect-default-rtdb.asia-southeast1.firebasedatabase.app/user.json?auth=' + firebaseAPIKey.API_KEY, {
        email: email,
        name: name,
        password: pass,
        connection: {'dummy': 'dummy'}
    })
    .then((response) => {
        const id = response.data.name;
        // Axios GET request for game items allocation
        axios.get('https://smux-connect-default-rtdb.asia-southeast1.firebasedatabase.app/item.json?auth=' + firebaseAPIKey.API_KEY)
        .then((response) => {
            const data = response.data;
            let temp_arr = [];
            let temp_obj = {};
            for (const key in data) {
                temp_arr.push(key)
                temp_obj[key] = 0;
            }
            // Assign items to user
            axios.patch('https://smux-connect-default-rtdb.asia-southeast1.firebasedatabase.app/user/' + id + '.json?auth=' + firebaseAPIKey.API_KEY, {
                inventory: temp_arr,
                bingo: temp_obj
            });
            alert('Account created successfully. You will be redirected back to the login page.');
            window.location.replace('index.html');
        });
    });
}

function logout() {
    window.sessionStorage.clear();
    window.location.replace('index.html');
}