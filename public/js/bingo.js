async function getItems() {
    const response = await axios.get('https://smux-connect-default-rtdb.asia-southeast1.firebasedatabase.app/user/' + sessionStorage.getItem("user") + '.json?auth=' + firebaseAPIKey.API_KEY);
    let table = document.getElementById('bingo');
    let counter = 0;
    let points = 0;

    if (!response.data.inventory) {
        points = Object.keys(response.data.bingo).length;
        const clubArr = [
            './smux_img/Bike_01.jpg','./smux_img/Bike_02.jpg','./smux_img/Bike_03.jpg','./smux_img/Bike_04.jpg',
            './smux_img/Dive_01.jpg','./smux_img/Dive_02.jpg','./smux_img/Dive_03.jpg','./smux_img/Dive_04.jpg',
            './smux_img/Kaya_01.jpg','./smux_img/Kaya_02.jpg','./smux_img/Kaya_03.jpg','./smux_img/Kaya_04.jpg',
            './smux_img/Skat_01.jpg','./smux_img/Skat_02.jpg','./smux_img/Skat_03.jpg','./smux_img/Skat_04.jpg',
            './smux_img/Trek_01.jpg','./smux_img/Trek_02.jpg','./smux_img/Trek_03.jpg','./smux_img/Trek_04.jpg',
            './smux_img/XSee_01.jpg','./smux_img/XSee_02.jpg','./smux_img/XSee_03.jpg','./smux_img/XSee_04.jpg',
            './smux_img/XSee_05.jpg','./smux_img/XSee_06.jpg','./smux_img/XSee_07.jpg'
        ];
        let chosenImg = clubArr[Math.floor(Math.random() * clubArr.length)];
        document.getElementById('bingoBoard').innerHTML = `
            <div class="card">
                <div class="card-head">
                    <span class="card-title" style="color: white">___</span>
                </div>
                <div class="card-image" style="margin: 5% 5% 0 5%">
                    <img src="${chosenImg}" style="width:100%; height: auto">
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
                            <img src="./img/SMUXie.jpg">
                        </div>
                    </div>
                </div>`;
            }
            else {
                table.innerHTML += `
                <div class="col s6 m4 l3">
                    <div class="card">
                        <div class="card-image">
                            <img src="./smux_img/${response.data.stickers[counter]}">
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
    const response = await axios.get('https://smux-connect-default-rtdb.asia-southeast1.firebasedatabase.app/item/' + sessionStorage.getItem("crewStatus") + '.json?auth=' + firebaseAPIKey.API_KEY);
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