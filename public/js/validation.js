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
                        if (data[key].alumni === true) {
                            window.sessionStorage.setItem('crewStatus', 'alumni');
                        }
                        else {
                            window.sessionStorage.setItem('crewStatus', 'student');
                        }
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
    let alumni = document.getElementById('alumni').checked;
    let tnc = document.getElementById('tnc').checked;
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
        let crewStatus = '';
        if (alumni === true) {
            crewStatus = 'alumni';
        }
        else {
            crewStatus = 'student';
        }
        axios.get('https://smux-connect-default-rtdb.asia-southeast1.firebasedatabase.app/item/' + crewStatus + '.json?auth=' + firebaseAPIKey.API_KEY)
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
                alumni: alumni,
                password: encrypted,
                connection: {'dummy': 'dummy'},
                stickers: stickerArr
            })
            .then((response) => {
                const id = response.data.name;
                // Axios GET request for game items allocation
                axios.get('https://smux-connect-default-rtdb.asia-southeast1.firebasedatabase.app/item/' + crewStatus + '.json?auth=' + firebaseAPIKey.API_KEY)
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

async function showQRHREF() {
    const response = await axios.get('https://smux-connect-default-rtdb.asia-southeast1.firebasedatabase.app/user/' + sessionStorage.getItem("user") + '.json?auth=' + firebaseAPIKey.API_KEY);
    console.log(response.data.inventory);
    if (!response.data.inventory) {
        document.getElementById('qrHREF').remove();
    }
}

/* Simple Insert of pre-decided questions. Needs a button on a page with this js file called to activate this. */
// function tempPush() {
//     axios.patch('https://smux-connect-default-rtdb.asia-southeast1.firebasedatabase.app/.json?auth=' + firebaseAPIKey.API_KEY, {
//         item: {
//             student: {
//                 a: "What inspired you to pursue a career in this field?",
//                 b: "Can you describe a typical day at your job?",
//                 c: "What skills or qualifications are most important for success in this industry?",
//                 d: "How did you find your first job in this field?",
//                 e: "What are the biggest challenges you’ve faced in your career so far?",
//                 f: "What do you enjoy most about your current role?",
//                 g: "How do you stay updated with industry trends and advancements?",
//                 h: "Can you recommend any resources for learning more about this field?",
//                 i: "What advice would you give to someone just starting out in this career?",
//                 j: "How did your previous roles prepare you for your current position?",
//                 k: "What opportunities for growth and advancement do you see in your field?",
//                 l: "Can you share an experience where you overcame a significant obstacle in your career?",
//                 m: "What role does networking play in your professional development?",
//                 n: "How do you balance work and personal life?",
//                 o: "What are some common misconceptions about working in your field?",
//                 p: "Are there any professional organizations or associations you would recommend joining?"
//             },
//             alumni: {
//                 a: "What are some of the latest trends in biking among students?",
//                 b: "How have skateboarding techniques and equipment evolved recently?",
//                 c: "What new safety protocols or gear are popular in kayaking these days?",
//                 d: "Are there any recent advancements or changes in diving technology or practices?",
//                 e: "What new trekking routes or destinations are popular with the student community?",
//                 f: "How have biking events or clubs changed in terms of participation and organization?",
//                 g: "What are the most popular skateparks or spots among students currently?",
//                 h: "How do students stay informed about kayaking conditions and safety updates?",
//                 i: "What are some new diving spots or dive clubs that students are excited about?",
//                 j: "What gear or technology are students using for trekking now?",
//                 k: "How has the student community's approach to bike maintenance and customization evolved?",
//                 l: "What are some emerging trends in skateboarding culture or competitions?",
//                 m: "How are students managing kayaking trips and training during different seasons?",
//                 n: "What are the current best practices for diving safety and environmental protection among students?",
//                 o: "What are some new challenges or goals that students are setting for their trekking adventures?",
//                 p: "How are SMUX Clubs collaborating or interacting with each other?"
//             }
//         }
//     });
// }