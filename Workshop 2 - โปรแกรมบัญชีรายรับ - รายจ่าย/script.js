
//อ้างอิง element จาก index.html
const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');


let transaction = []; //ข้อมูลเริ่มต้น

function init() { //เรียกใช้ฟังก์ชันเพื่อแสดงข้อมูล
    list.innerHTML = '';
    transaction.forEach(addDataToList);
    calculateMoney();
}

function addDataToList(transaction) { //เพิ่มข้อมูลลงใน list
    const symbol = transaction.amount < 0 ? '-' : '+'; //เช็คว่าเป็นรายรับหรือรายจ่าย
    const status = transaction.amount < 0 ? 'minus' : 'plus'; //เช็คว่าเป็นรายรับหรือรายจ่าย
    const item = document.createElement('li');
    result = formatNumber(Math.abs(transaction.amount));
    item.classList.add(status);
    item.innerHTML = `${transaction.text} <span>${symbol} ฿${result}</span><button class="delete-btn" onclick="removeData(${transaction.id})">x</button>`;
    list.appendChild(item);
}

function formatNumber(number) { //เพิ่มเครื่องหมายคอมม่าในการแสดงผล
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function generateID() { //สร้าง ID ใหม่  
    return Math.floor(Math.random() * 100000000); 
} 

function removeData(id) { //ลบข้อมูล
    transaction = transaction.filter(transaction => transaction.id !== id);
    init();
}

function calculateMoney() { //คำนวณยอดเงินทั้งหมด
    const amounts = transaction.map(transaction => transaction.amount);
    const total = amounts.reduce((result, item) => (result += item), 0).toFixed(2);
    const income = amounts.filter(item => item > 0).reduce((acc, item) => (acc += item), 0).toFixed(2);
    const expense = (amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1).toFixed(2);
    balance.innerText = `฿` + formatNumber(total);
    money_plus.innerText = `฿` + formatNumber(income);
    money_minus.innerText = `฿` + formatNumber(expense);
}

function addTransaction(e) { //เพิ่มข้อมูลใหม่
    e.preventDefault();
    if (text.value.trim() === '' || amount.value.trim() === '') {
        alert('กรุณากรอกข้อมูลให้ครบ');
    } else {
        const transactionData = {
            id: generateID(),
            text: text.value,
            amount: +amount.value
        };
        transaction.push(transactionData);
        addDataToList(transactionData);
        calculateMoney();
        text.value = '';
        amount.value = '';
    }
}
form.addEventListener('submit', addTransaction);
init();