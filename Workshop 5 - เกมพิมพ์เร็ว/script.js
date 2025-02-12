const wordEl = document.getElementById('word');
const textEl = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');

const btnlevelEl = document.getElementById('level-btn');
const settingsEl = document.getElementById('settings');
const levelformEl = document.getElementById('level-form');
const levelEl = document.getElementById('level');
const gameoverEl = document.getElementById('gameover');

const words = ["เศรษฐี", "จักรยาน", "ลำโพง", "เครื่องคิดเลข"];

let randomtext;
let score = 0;
let time = 10; // easy = 15, medium = 10, hard = 5
let saveMode = localStorage.getItem('mode') !== null ? localStorage.getItem('mode') : 'medium'; 
let level = 'medium';

const timeInterval = setInterval(updateTime, 1000);

function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

function diplayWordToUi() {
    randomtext = getRandomWord();
    wordEl.innerHTML = randomtext;
    timeEl.innerHTML = time;

}

textEl.addEventListener('input', (e) => {
    const inputText = e.target.value;

    if (inputText === randomtext) {
        if (saveMode == 'easy') {
            time += 5
        } else if (saveMode == 'medium') {
            time += 3
        } else {
            time += 2
        }
        diplayWordToUi();
        updateScore();
        e.target.value = '';
    }
});

function updateScore() {
    score += 10;
    scoreEl.innerHTML = score;
}

function updateTime() {
    time--;
    timeEl.innerHTML = time;

    if (time === 0) {
        clearInterval(timeInterval);
        gameOver();
    }
}

function gameOver() {
    gameoverEl.innerHTML = `
    <h1>จบเกมแล้วนะครับ</h1>
    <p>คะแนนของคุณ = ${score} แต้ม</p>
    <button onclick="location.reload()">เล่นอีกครั้ง</button
    `;
    gameoverEl.style.display = 'flex';
}

btnlevelEl.addEventListener('click', () => {
    settingsEl.classList.toggle('hide');
});

levelEl.addEventListener('change', (e) => {
    level = e.target.value;
    localStorage.setItem('mode', level);
    saveMode = localStorage.getItem('mode') !== null ? localStorage.getItem('mode') : 'medium';
    startGame();
});

function startGame() {
    levelEl.value = saveMode;

    if (saveMode == 'easy') {
        time = 15
    } else if (saveMode == 'medium') {
        time = 10
    } else {
        time = 5
    }
    diplayWordToUi();
}

startGame();
textEl.focus();