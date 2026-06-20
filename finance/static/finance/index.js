document.addEventListener('DOMContentLoaded', function() {
    transactionsList();
    document.querySelector('#transaction-button').addEventListener('click', transaction);
    document.querySelector('#add-button').addEventListener('click', apearbox);
    document.querySelector('#button-addon2').addEventListener('click', addCategory);
    document.querySelector('#category-select').addEventListener('change', transactionsList);
    document.querySelector('#type-select').addEventListener('change', transactionsList);
    document.querySelector('#month-select').addEventListener('change', transactionsList);
})


let counter = 10


window.onscroll = function() {
    if (window.scrollY + window.innerHeight >= document.body.offsetHeight) {
        document.querySelectorAll('.card').forEach(card => {
            if (parseInt(card.id) <= counter) {
                card.style.display = 'block';
            }
        })
        counter++;
    }
}


function transaction() {
    const category = document.querySelector('#category').value;
    const title = document.querySelector('#transaction-title').value;
    const dorw = document.querySelector('#transaction-type').value;
    const amount = parseFloat(document.querySelector('#transaction-amount').value);
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    fetch('transaction', {
        method: 'POST',
        headers: {
            'X-CSRFToken': csrfToken
        },
        body: JSON.stringify({
            category: category,
            amount: amount,
            title: title,
            dorw: dorw
        })
    })
    .then(Response => Response.json())
    .catch(error => console.error(error))

    let balance = parseFloat(document.querySelector('#balance').innerHTML);
    if (dorw === 'withdraw') {
        balance -= amount;
    }
    else if (dorw === 'deposit') {
        balance += amount;
    }
    document.querySelector('#balance').innerHTML = balance;
    document.querySelector('#transaction-title').innerHTML = '';
    setTimeout(1)
    transactionsList();
}


function showTransaction() {
    const transactionDiv = document.getElementById('transaction');
    document.querySelector('#animate-button').style.display = 'none';

    transactionDiv.style.display = 'block';  
    transactionDiv.offsetHeight;

    transactionDiv.classList.add('apear-animation'); 
}


function apearbox() {
    const select = document.getElementById('category');
    const input = document.getElementById('add-category');

    document.querySelector('#add-button').style.display = 'none';
    
    select.style.width = '80%'; 
    
    input.classList.add('show');
}


function addCategory() {
    const name = document.querySelector('#add-input').value;
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    fetch('add_category', {
        method: 'POST',
        headers: {
            'X-CSRFToken': csrfToken
        },
        body: JSON.stringify({
            name: name,
        })
    })
    .then(Response => Response.json())
    .then(data => console.error(data.error));

    const select = document.querySelector('#category');
    const option = document.createElement('option');
    option.value = name;
    option.innerHTML = name;
    select.appendChild(option);
    document.querySelector('#add-input').value = '';

}


function transactionsList() {
    const category = document.querySelector('#category-select').value;
    const stype = document.querySelector('#type-select').value;
    const month = document.getElementById('month-select').value;
    document.querySelector('#reports-container').innerHTML = '';
    let idCounter = 1


    fetch('categories')
    .then(response => response.json())
    .then(data => {
        const category_list = data;
        fetch('transactions_list')
        .then(response => response.json())
        .then(d => {
            d.forEach(element => {
                if ((element.category_id === parseInt(category) || category === 'All') && (String(new Date(element.timestamp)).slice(4, 8).startsWith(month) || month === 'All')) {
                    var type = (element.dorw ? 'Deposit' : 'Withdraw');
                    if (stype === type || stype === 'All') {
                        category_list.forEach(c => {
                            if (parseInt(c.id) === parseInt(element.category_id)) {
                                var categori = c.name;
                                const div = document.createElement('div');
                                div.setAttribute('class', 'card');
                                div.setAttribute('id', idCounter)
                                div.innerHTML = `
                                    <div class="card-body" >
                                        <h4 class="card-title">${element.title}</h4>
                                        <h6 class="card-subtitle mb-2 text-muted"> ${categori} </h6>
                                        <h6 class="card-text">$${element.amount}</h6>
                                        <h6 class="card-subtitle mb-2 text-muted">Type: ${type} </h6>
                                        <h6 class="card-subtitle mb-2 text-muted"> <small class="text-body-secondary">${new Date(element.timestamp)}</small> </h6>
                                    </div>`;
                                if (idCounter > 10) {
                                    div.style.display = 'none';
                                }
                                idCounter++;
                                document.querySelector('#reports-container').appendChild(div)
                            }

                        });
                    }
                }
            });
        })
    })
}