async function getItems() {
    const response = await axios.get('https://smux-connect-default-rtdb.asia-southeast1.firebasedatabase.app/item.json?auth=AIzaSyCVi6loRRJgyBOFnoOvuTDCasJVAQYNyNk');
    let bingo = document.getElementById('bingo');
    for (let key in response.data) {
        bingo.innerHTML += `
            <div class="card">
                <div class="card-content">
                    <span class="card-title">${key}</span>
                </div>
            </div>`;
    }
};