async function getItems() {
    const response = await axios.get('https://smux-connect-default-rtdb.asia-southeast1.firebasedatabase.app/user/' + sessionStorage.getItem("user") + '.json?auth=AIzaSyCVi6loRRJgyBOFnoOvuTDCasJVAQYNyNk');
    let table = document.getElementById('bingo');
    for (let key in response.data.bingo) {
        if (response.data.bingo[key] === 0) {
            table.innerHTML += `
            <div class="col s3 m4 l6 xl12">
                <div class="card">
                    <div class="card-content">
                        <span class="card-title">${key}</span>
                    </div>
                </div>
            </div>`;
        }
        else {
            table.innerHTML += `
            <div class="col s3 m4 l6 xl12">
                <div class="card">
                    <div class="card-content">
                        <span class="card-title">Done!</span>
                    </div>
                </div>
            </div>`;
        }
    }
};

async function getQuestion() {
    const response = await axios.get('https://smux-connect-default-rtdb.asia-southeast1.firebasedatabase.app/item.json?auth=AIzaSyCVi6loRRJgyBOFnoOvuTDCasJVAQYNyNk');
    let qns = document.getElementById('question');
    qns.innerHTML += `<p>${response.data[localStorage.getItem("target")]}</p>`;
};