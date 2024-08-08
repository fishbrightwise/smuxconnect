// Login validation
function validateForm() {
    let email = document.getElementById('email').value;
    let pass = document.getElementById('password').value;
    
    axios.get('https://smux-connect-default-rtdb.asia-southeast1.firebasedatabase.app/user.json?auth=' + firebaseAPIKey.API_KEY)
    .then((response) => {
        const data = response.data;
        for (const key in data) {
            decrypted = decryptPassword(data[key].password, email);
            if (data[key].email === email && decrypted === pass) {
                window.sessionStorage.setItem('user', key);
                window.sessionStorage.setItem('name', data[key].name);
                window.location.replace('home.html');
                return;
            }
        }
        document.getElementById('errors').innerHTML = 'Invalid Email Address or Password';
        return;
    });
}

// Register validation
function createUser() {
    let email = document.getElementById('email').value;
    let name = document.getElementById('name').value;
    let pass = document.getElementById('pass').value;
    let cfmpass = document.getElementById('cfmpass').value;
    let errors = '';

    // Validaton
    if (email === '' || name === '' || pass === '' || cfmpass === '') {
        errors = 'Please fill in all fields';
    }
    else if (pass !== cfmpass) {
        errors = 'Passwords do not match';
    }

    if (errors !== '') {
        document.getElementById('errors').innerHTML = errors;
        return;
    }
    else {
        let encrypted = encryptPassword(pass, email)
        // Axios POST request
        axios.post('https://smux-connect-default-rtdb.asia-southeast1.firebasedatabase.app/user.json?auth=' + firebaseAPIKey.API_KEY, {
            email: email,
            name: name,
            password: encrypted,
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
}

function logout() {
    sessionStorage.clear();   
    loggedOutCheck(); 
}

function loggedOutCheck() {
    if (window.sessionStorage.getItem('user') === null) {
        window.location.replace('index.html');
    }
}

function loggedInCheck () {
    if (window.sessionStorage.getItem('user') !== null) {
        window.location.replace('home.html');
    }
}

// Password Encryption. Uses Crypto.js
function encryptPassword(password, email) {
    return CryptoJS.AES.encrypt(password, email).toString(); // Binds password to an identifier, the user's email
};

// Password Decryption. Uses Crypto.js
function decryptPassword(password, email) {
    return CryptoJS.AES.decrypt(password, email).toString(CryptoJS.enc.Utf8); // Verifies identifier, the user's email to unlock password.
}