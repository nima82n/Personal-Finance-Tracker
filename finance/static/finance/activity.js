document.addEventListener('DOMContentLoaded', function() {
    const today = new Date()
    const day = today.getDate()
    const month = today.getMonth() + 1
    const year = today.getFullYear()
    document.getElementById('chart-date').value = `${year}-${month}-${day}`
    loadChart(false);
})


function destroyChart(type) {
    const chartDiv = document.getElementById('transactionChart-div');
    chartDiv.innerHTML = '';
    const canvas = document.createElement('canvas');
    canvas.setAttribute('id', 'transactionChart');
    canvas.width = 400;
    canvas.height = 200;
    chartDiv.appendChild(canvas);
    loadChart(type);
}


function loadChart(type) {
    let [year, month, day] = (document.getElementById('chart-date').value).split('-').map(Number)
    const ctx = document.getElementById("transactionChart").getContext("2d");
    const category = document.getElementById('chart-category').value;
    const timestampsList = []
    const amountsList = []
    let totalDeposit = 0.00
    let totalWithdraw = 0.00
    var color = (type ? 'rgba(0, 128, 0, 0.6)': 'rgba(255, 0, 0, 0.6)')
    fetch('transactions_list')
    .then(response => response.json())
    .then(transactions => {
        for (let i of transactions) {
            if (i.dorw === type && (parseInt(i.category_id) === parseInt(category) || category === 'All')) {
                let timestamp = new Date(i.timestamp)
                if ((timestamp.getMonth() + 1 === month) && (timestamp.getFullYear() === year) && (day - timestamp.getDate() <= 7)) {
                    timestamp = `${timestamp.getDate()} ${timestamp.getHours()}:${timestamp.getMinutes()}:${timestamp.getSeconds()}`
                    timestampsList.push(timestamp)
                    amountsList.push(parseFloat(i.amount))
                }
            }
        }
        new Chart(ctx, {
            type: "line",
            data: {
                labels: timestampsList.reverse(),
                datasets: [{
                    label: "amount",
                    data: amountsList,
                    backgroundColor: color,
                    borderColor: color,
                    borderWidth: 2,
                    fill: false
                }]
            },
            options: {
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
        transactions.forEach(element => {
            if (element.dorw) {
                totalDeposit += parseFloat(element.amount)
            } else if (! element.dorw) {
                totalWithdraw += parseFloat(element.amount)
            }
        });
        document.getElementById('total-deposit').innerHTML = `Total deposit: ${totalDeposit}`;
        document.getElementById('total-withdraw').innerHTML = `Total withdraw: ${totalWithdraw}`;
    })
}