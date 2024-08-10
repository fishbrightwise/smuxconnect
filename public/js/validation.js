// Login validation
function validateForm() {
    let email = document.getElementById('email').value;
    let pass = document.getElementById('password').value;
    
    axios.get('https://smux-connect-default-rtdb.asia-southeast1.firebasedatabase.app/user.json?auth=' + firebaseAPIKey.API_KEY)
    .then((response) => {
        const data = response.data;
        if (email === '' || pass === '') {
            document.getElementById('errors').innerHTML = 'Please fill in all fields';
            return;
        }
        else {
            for (const key in data) {
                if (data[key].email === email) {
                    decrypted = decryptPassword(data[key].password, email);
                    if (decrypted === pass) {
                        window.sessionStorage.setItem('user', key);
                        window.sessionStorage.setItem('name', data[key].name);
                        document.getElementById('errors').innerHTML = '';
                        document.getElementById('success').innerHTML = 'Login Successful.';
                        setTimeout(sendToHome, 1500);
                        return;
                    }
                }
            }
            document.getElementById('errors').innerHTML = 'Invalid Email Address or Password';
            return;
        }
    });
}

// Register validation
function createUser() {
    let email = document.getElementById('email').value;
    let name = document.getElementById('name').value;
    let dob = document.getElementById('dob').value
    let club = Array.from(document.getElementById('club').selectedOptions).map(option => option.value);
    let pass = document.getElementById('pass').value;
    let cfmpass = document.getElementById('cfmpass').value;
    let tnc = document.getElementById('tnc').checked;
    console.log(tnc);
    let errors = '';

    // Validaton
    if (email === '' || name === '' || dob === '' || (club.length === 0 || club[0] === 'Choose your club(s)') || pass === '' || cfmpass === '') {
        errors = 'Please fill in all fields';
    }
    else if (pass !== cfmpass) {
        errors = 'Passwords do not match';
    }
    else if (!tnc) {
        errors = 'Please accept the Terms & Conditions';
    }

    if (errors !== '') {
        document.getElementById('errors').innerHTML = errors;
        return;
    }
    else {
        let encrypted = encryptPassword(pass, email)
        let stickerArr = [];
        axios.get('https://smux-connect-default-rtdb.asia-southeast1.firebasedatabase.app/item.json?auth=' + firebaseAPIKey.API_KEY)
        .then((response) => {
            const itemCount = Object.keys(response.data).length;
            for (let i = 0; i < itemCount; i++) {
                stickerArr.push(Math.floor(Math.random() * itemCount) + 1);
            }
            // Axios POST request
            axios.post('https://smux-connect-default-rtdb.asia-southeast1.firebasedatabase.app/user.json?auth=' + firebaseAPIKey.API_KEY, {
                email: email,
                name: name,
                dob: dob,
                club: club,
                password: encrypted,
                connection: {'dummy': 'dummy'},
                stickers: stickerArr
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
                    document.getElementById('errors').innerHTML = '';
                    document.getElementById('success').innerHTML = 'Account created successfully. You will be redirected back to the login page.'
                    setTimeout(sendToIndex, 3000);
                });
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
        sendToIndex();
    }
}

function loggedInCheck () {
    if (window.sessionStorage.getItem('user') !== null) {
        sendToHome();
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

function sendToHome() {
    window.location.replace('home.html');
}

function sendToIndex() {
    window.location.replace('index.html');
}

function removeDefault(s) {
    const elOptions = s.querySelectorAll('option')
    elOptions[0].selected  = false;
}