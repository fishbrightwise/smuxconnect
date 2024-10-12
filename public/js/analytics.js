async function getData() {
    const response = await axios.get('https://smux-connect-default-rtdb.asia-southeast1.firebasedatabase.app/.json?auth=' + firebaseAPIKey.API_KEY);
    const items = response.data.item;
    const users = response.data.user;
    const totalPoints = Object.keys(items.alumni).length;
    const totalUsers = Object.keys(users).length - 1;

    let userObj = {};

    for (const [key, obj] of Object.entries(users)) {
        if (key === 'dummy') {
            continue;
        }
        // if (!obj.inventory) {
        //     points = Object.keys(obj.bingo).length;
        // } 
        // else {
        //     points = Object.keys(obj.bingo).length - obj.inventory.length;
        // }
        let counter = 0;
        for (const [key, value] of Object.entries(obj.connection)) {
            if (value) {
                counter++;
            }
            userObj[obj.name] = counter - 1;
        }
    }
    const maxScore = Math.max(...Object.values(userObj));
    const topUsers = Object.keys(userObj).filter(user => userObj[user] === maxScore);
    const winner = topUsers.length === 1 ? topUsers[0] : topUsers;

    document.getElementById('statistics').innerHTML = `
        <p>Total Users: <b>${totalUsers}</b></p>
        <p>Highest Scoring Participants:</p>
        <ul>
            ${topUsers.map(user => `<li>${user} with <b>${userObj[user]}</b> points</li>`).join('')}
        </ul>
    `;

    userObj = Object.fromEntries(
        Object.entries(userObj).sort(([, a], [, b]) => b - a)
    );
    for (const [key, obj] of Object.entries(userObj)) {
        const div = document.createElement('div');
        div.innerHTML = `
            <p>${key}: ${obj}</p>
        `;
        document.getElementById('list').appendChild(div);
    }
};

function autoRefresh() {
    document.getElementById('statistics').innerHTML = '';
    document.getElementById('list').innerHTML = '';
    getData();
    setTimeout(autoRefresh, 5000);
}