async function getItems() {
    const response = await axios.get('https://smux-connect-default-rtdb.asia-southeast1.firebasedatabase.app/user/' + sessionStorage.getItem("user") + '.json?auth=' + firebaseAPIKey.API_KEY);
    let table = document.getElementById('bingo');
    let counter = 0;
    for (let key in response.data.bingo) {
        if (response.data.bingo[key] === 0) {
            
            table.innerHTML += `
            <div class="col s6 m4 l3">
                <div class="card">
                    <div class="card-image">
                        <img src="./img/emo${response.data.stickers[counter]}.jpg">
                    </div>
                </div>
            </div>`;
        }
        else {
            table.innerHTML += `
            <div class="col s6 m4 l3">
                <div class="card">
                    <div class="card-image">
                        <img src="./img/Done.png">
                    </div>
                </div>
            </div>`;
        }
        counter++;
    }
};

async function getQuestion() {
    const response = await axios.get('https://smux-connect-default-rtdb.asia-southeast1.firebasedatabase.app/item.json?auth=' + firebaseAPIKey.API_KEY);
    let qns = document.getElementById('question');
    qns.innerHTML += `<p>${response.data[localStorage.getItem("target")]}</p>`;
};