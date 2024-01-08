let fields = Array.from(document.getElementsByClassName('field'));
let mainBtn = document.getElementById('mainBtn');
let mainText = document.getElementById('mainText');
let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks');

const O_TEXT = "O";
const X_TEXT = "X";
const PLAY = "Play";
const RESTART = "Restart";
const COMBINATIONS = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];

let current_player = X_TEXT;
let spaces = Array(9).fill(null);

const SetGameStatus = (action) => {
    if (action === PLAY) fields.forEach(field => field.addEventListener('click', fieldClicked));
    if (action === RESTART) fields.forEach(field => field.removeEventListener('click', fieldClicked));
}

mainBtn.addEventListener('click', setMainBtn);

function setMainBtn() {
    let currentAction = mainBtn.innerHTML;

    if (!(currentAction == PLAY)) restart();
    mainBtn.innerHTML = RESTART;
    SetGameStatus(PLAY);
}

function fieldClicked(e) {
    const id = e.target.id;

    if (!spaces[id]) {
        spaces[id] = current_player;
        e.target.innerText = current_player;

        const winningFields = playerHasWon();

        if (winningFields) {
            mainText.innerHTML = `${current_player} has won!`;

            winningFields.map(fieldIndex => fields[fieldIndex].style.backgroundColor = winnerIndicator);
        }
        current_player = current_player === X_TEXT ? O_TEXT : X_TEXT;
    }
}

function playerHasWon() {
    for (const combination of COMBINATIONS) {
        let [a, b, c] = combination;

        if (spaces[a] && (spaces[a] == spaces[b] && spaces[b] == spaces[c])) {
            return [a, b, c];
        }
    }
    return false;
}

function restart() {
    spaces.fill(null);

    fields.forEach(field => {
        field.innerText = '';
        field.style.backgroundColor='';
    });

    mainText.innerHTML = 'Tic Tac Toe Game';
    current_player = X_TEXT;
    SetGameStatus(PLAY);
    mainBtn.addEventListener('click', setMainBtn);
}