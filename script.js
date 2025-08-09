
const amount = document.getElementById('amount');
const desc = document.getElementById('desc');
const addexpense = document.getElementById('addexpense');
const tableBody = document.getElementById('expenseTableBody');
const totalamount = document.getElementById('totalamount');




function saveData() {

    const expese = JSON.parse(localStorage.getItem('expenses')) || [];
    tableBody.innerHTML = '';
    let total = 0;

    expese.forEach((expense, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            
            <td>${expense.desc}</td>
            <td>${expense.amount}</td>
            <td><button class="delete-btn" onclick="deleteExpense(${index})">Delete</button></td>
        `;
        tableBody.appendChild(row);
        total += parseFloat(expense.amount);
    });
      totalamount.innerHTML = `Total: <span>$${total.toFixed(2)}</span>`;
}


function deleteExpense(index) {
    const confirmation = confirm('Are you sure you want to delete this expense?');
    if (!confirmation) {
        return;
    }else{
         const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.splice(index, 1);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    saveData();
    }
   
}




addexpense.addEventListener('click', (e) => {

    console.log('working');
    e.preventDefault();
    if (amount.value === '' || desc.value === '') {
        alert('Please fill in all fields');
        return;
    }
    const expense = {
        amount: amount.value,
        desc: desc.value
    };
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.push(expense);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    amount.value = '';
    desc.value = '';
    saveData();
})

addexpense.addEventListener('click', saveData());