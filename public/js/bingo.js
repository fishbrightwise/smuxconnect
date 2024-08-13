async function getItems() {
    const response = await axios.get('https://smux-connect-default-rtdb.asia-southeast1.firebasedatabase.app/user/' + sessionStorage.getItem("user") + '.json?auth=' + firebaseAPIKey.API_KEY);
    let table = document.getElementById('bingo');
    let counter = 0;
    let points = 0;

    if (!response.data.inventory) {
        points = Object.keys(response.data.bingo).length;
        document.getElementById('bingoBoard').innerHTML = `
            <div class="card">
                <div class="card-image" style="margin: 5% 5% 0 5%">
                    <img src="./img/star.png" style="width:100%; height: auto">
                </div>
                <div class="card-content">
                    <p><b>Congratulations!</b> <br>You have completed the bingo board! Keep on connecting!</p>
                    <p>Here's a star for you!</p>
                    <p id="points"></p>
                </div>
            </div>
        `;
    }
    else {
        for (let key in response.data.bingo) {
            points = (Object.keys(response.data.bingo).length) - response.data.inventory.length;
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
    }
    document.getElementById('points').innerHTML = `<p>You have <span class="orange-text text-darken-2"><b>${points}</b></span> point(s)!</p>`;
};

async function getQuestion() {
    const response = await axios.get('https://smux-connect-default-rtdb.asia-southeast1.firebasedatabase.app/item.json?auth=' + firebaseAPIKey.API_KEY);
    let qns = document.getElementById('question');
    qns.innerHTML += `<b><i>"${response.data[localStorage.getItem("target")]}"</i></b>`;
};

async function getConnectedName() {
    const response = await axios.get('https://smux-connect-default-rtdb.asia-southeast1.firebasedatabase.app/user/' + localStorage.getItem("targetName") + '.json?auth=' + firebaseAPIKey.API_KEY);
    let name = response.data.name;
    document.getElementById('targetName').innerText = name;
}

function clearQuestion() {
    localStorage.removeItem("target");
    localStorage.removeItem("targetName");
    window.location.href = "home.html";
}