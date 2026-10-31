const statusDisplay = document.getElementById('status');
const gameBoard = document.getElementById('game-board');
const resetButton = document.getElementById('rst-btn');
const mode2pButton = document.getElementById('m2');
const mode3pButton = document.getElementById('m3');
const modal = document.getElementById('modal')
const closeModalButton = document.getElementById('modal-close-button');


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
    gameBoard.className = `grid board -${boardSize}x${boardSize}`;

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
    const curPlayer = gameMode === '2P' ? p2 : p3;
    //jelenlegi jatekos indexe
    const curIdx = curPlayers.indexOf(currentPlayer);
    //kovetkezo jatekos indexe
    const nextIdx = (curIdx + 1) % curPlayers.length;
    currentPlayer = curPlayers[nextIdx];
    msg.innerHTML = turnTxt(currentPlayer);
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
    const K = winLen;//nyeresi feltetel hossza

    
    const currentPlayer = gameMode ==='2P' ? p2 : p3; // melyik jatekos lista kell

    for (const player of players) {
        for (let row = 0; row < N; row++) {
            for (let col = 0; col <= N - K; col++) {
                let combo = [];
                let isWin = true;
                for (let k = 0; k < K; k++) {
                    const index = row * N + (col + k);
                    if (gameState[index] !== player) {
                        isWin = false;
                        break;
                    }
                    combo.push(index);
                }
                if (isWin) return { winner: player, combo };
            }
        }

        for (let col = 0; col < N; col++) {
            for (let row = 0; row < N; row++) {
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

        for (let row =0; row <= N; row++) {//főátló ellenőrzése
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
    }
    return { winner: null, combo: [] };
}

