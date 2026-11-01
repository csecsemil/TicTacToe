const statusDisplay = document.getElementById('status');
const gameBoard = document.getElementById('game-board');
const resetButton = document.getElementById('rst-btn');
const mode2pButton = document.getElementById('m2');
const mode3pButton = document.getElementById('m3');
const modal = document.getElementById('modal')
const closeModalButton = document.getElementById('modal-close-button');

const modalMsg = document.getElementById('modal-message');


let gameActive = true;
let currentPlayer = 'X';
let gameState = [];
let gameMode = '2P';
let boardSize = 3;
const winConditionLength = 3;


const player2P = ['X', 'O'];
const player3P = ['X', 'O', 'Z'];

const winningMessage = (player) => `Player ${player} won!`;
const drawMessage = `Draw!`;
const currentPlayerTurn = (player) => `Player ${player} turn!`;

function createGameBoard() {
    gameBoard.innerHTML ='';

    gameBoard.style.gridTemplateColumns = `repeat(${boardSize}, 1fr)`; // beallitjuk a tabla meretet
    gameBoard.style.gridTemplateRows = `repeat(${boardSize}, 1fr)`; 

    const totalCells = boardSize * boardSize;
    gameState = Array(totalCells).fill('');

    for (let i = 0; i < totalCells; i++) {
        const  cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-index', i);
        
        cell.addEventListener('click', handleCellClick);
        gameBoard.appendChild(cell);
    }

    
} 

//kovi jatekos
function handlePlayerChange() {
    //melyik jatekos lista kell
    const curPlayers = gameMode === '2P' ? player2P : player3P;
    //jelenlegi jatekos indexe
    const curIdx = curPlayers.indexOf(currentPlayer);
    //kovetkezo jatekos indexe
    const nextIdx = (curIdx + 1) % curPlayers.length;
    currentPlayer = curPlayers[nextIdx];
    statusDisplay.innerHTML = currentPlayerTurn(currentPlayer);
}

function handleCellClick(event) {
    //kattintott cella
    const cell = event.target;
    const cellIndex = parseInt(cell.getAttribute('data-index'));
    //ha a cella mar foglalt vagy a jatek nem aktivalt, akkor kilepunk
    if (gameState[cellIndex] !== '' || !gameActive) {
        return;
    }
    
    //beirjuk a cellaba a jatekos jelet 
    gameState[cellIndex] = currentPlayer;
    cell.innerHTML = currentPlayer;

    //hozzarendeljuk a cellahoz a jatekos osztalyat
    cell.classList.add(currentPlayer);

    validateResult();

}

function checkWin() {//ellenorizzuk a nyeresi felteteleket
    const N = boardSize;//tabla merete
    const K = winConditionLength;//nyeresi feltetel hossza

    const curPlayers = gameMode === '2P' ? player2P : player3P; // melyik jatekos lista kell

    for (const player of curPlayers) {//minden jatekosra ellenorizzuk a nyeresi felteteleket
        
        for (let row = 0; row < N; row++) {// sor ellenőrzése
            for (let col = 0; col <= N - K; col++) {// soron belüli oszlopok ellenőrzése
                let combo = [];//nyerő kombináció indexei
                let isWin = true;//nyerés feltétele
                for (let k = 0; k < K; k++) {//ellenőrizzük a K hosszú kombinációt
                    const index = row * N + (col + k);//index kiszámítása
                    if (gameState[index] !== player) {//ha a cella nem a jelenlegi jatekos jele, akkor nem nyert
                        isWin = false;//kilépünk a ciklusból
                        break;
                    }
                    combo.push(index);//
                }
                if (isWin) return { winner: player, combo };//ha nyert, visszaadjuk a nyert jatekos jelet és a nyerő kombináció indexeit
            }  
        }

        for (let col = 0; col < N; col++) {
            for (let row = 0; row <= N - K; row++) {
                let combo = [];
                let isWin = true;
                for (let k = 0; k < K; k++) {
                    const index = (row + k) * N + col;
                    if (gameState[index] !== player) {
                        isWin = false;
                        break;
                    }
                    combo.push(index);
                }
                if (isWin) return { winner: player, combo };
            }
        }

        //3.
        for (let row = 0; row <= N - K; row++) {//átló ellenőrzése
            for (let col = 0; col <= N - K; col++) {
                let combo = [];
                let isWin = true;
                for (let k = 0; k < K; k++) {
                    const index = (row + k) * N + (col + k);
                    if (gameState[index] !== player) {
                        isWin = false;
                        break;
                    }
                    combo.push(index);
                }
                if (isWin) return { winner: player, combo };
            }
        }

        for (let row = 0; row <= N - K; row++) {
            for (let col = K - 1; col < N; col++) {
                let combo = [];
                let isWin = true;
                for (let k = 0; k < K; k++) {
                    const index = (row + k) * N + (col - k);
                    if (gameState[index] !== player) {
                        isWin = false;
                        break;
                    }
                    combo.push(index);
                }
                if (isWin) return { winner: player, combo };
            }
        }
    }
    return { winner: null, combo: [] };
}


function validateResult() {
    const res = checkWin();

    if (res.winner) {//ha van nyertes
        gameActive = false;//jatek veget ert
        const txt = winningMessage(res.winner);
        statusDisplay.innerHTML = txt;

        res.combo.forEach(i => {//kiemeljük a nyerő kombinációt
            document.querySelector(`.cell[data-index="${i}"]`).classList.add('win');
        });

        showModal(txt);
        return;//ha van nyertes, akkor kilepunk
    }

    let isDraw = !gameState.includes('');//ha nincs üres cella, akkor döntetlen
    if (isDraw) {
        gameActive = false;
        statusDisplay.innerHTML = drawMessage;
        showModal(drawMessage);
        return;
    }


    handlePlayerChange();
}

resetButton.addEventListener('click', () => {
    gameActive = true;
    currentPlayer = 'X';
    statusDisplay.innerHTML = currentPlayerTurn(currentPlayer);
    modal.classList.add('hidden');
    createGameBoard();
});



closeModalButton.addEventListener('click', () => {
    gameActive = true;
    currentPlayer = 'X';
    statusDisplay.innerHTML = currentPlayerTurn(currentPlayer);
    createGameBoard();
});

mode2pButton.addEventListener('click', () => {
    gameMode = '2P';
    boardSize = 3;
    mode2pButton.classList.add('active');
    mode3pButton.classList.remove('active');
    gameActive = true;
    currentPlayer = 'X';
    statusDisplay.innerHTML = currentPlayerTurn(currentPlayer);
    createGameBoard();
});

mode3pButton.addEventListener('click', () => {
    gameMode = '3P';
    boardSize = 5;
    mode3pButton.classList.add('active');
    mode2pButton.classList.remove('active');
    gameActive = true;
    currentPlayer = 'X';
    statusDisplay.innerHTML = currentPlayerTurn(currentPlayer);
    createGameBoard();
});


function showModal(message) {
    modalMsg.innerHTML = message;
    modal.classList.remove('hidden');
}




createGameBoard();

