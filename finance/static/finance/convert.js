document.addEventListener('DOMContentLoaded', function() {
    fetch('proxy/symbols')
    .then(response => response.json())
    .then(data => {
        for (const [key, value] of Object.entries(data.symbols)) {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = value;
            document.getElementById('first-currency').appendChild(option.cloneNode(true));
            document.getElementById('second-currency').appendChild(option.cloneNode(true));
        }
    })
    .catch(error => console.error(error));
    document.getElementById('done').addEventListener('click', convert);
    document.getElementById('change-currency').addEventListener('click', changeCurrency);
    document.getElementById('convert-balance').addEventListener('click', convertBalance);
})


function convert() {
    const fc = document.getElementById('first-currency').value;
    const sc = document.getElementById('second-currency').value;
    let amount = parseFloat(document.getElementById('currency-amount').value);


    fetch('proxy/latest')
    .then(response => response.json())
    .then(data => {
        const rates = data.rates
        for (const [key, value] of Object.entries(rates)) {
            if (key === fc) {
                var famount = parseFloat(value);
            }
            if (key === sc) {
                var samount = parseFloat(value);
            }
        }
        const result = (samount / famount) * amount;
        document.getElementById('disabledInput').placeholder = `${result}  ${sc}`;
    })
    .catch(error => console.error(error))
}


function changeCurrency() {
    let fv = document.getElementById('first-currency').value;
    const selectElement = document.getElementById("first-currency");
    let sv = document.getElementById('second-currency').value;
    const selectElement2 = document.getElementById("second-currency");
    selectElement.value = sv;
    selectElement2.value = fv;
}


function convertBalance() {
    const balance = parseFloat(document.getElementById('convert-balance').dataset.balance);
    document.getElementById('currency-amount').value = balance;
    const selectElement = document.getElementById("first-currency");
    selectElement.value = 'USD';
}