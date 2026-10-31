const statusDisplay = document.getElementById('status');
const gameBoard = document.getElementById('game-board');
const resetButton = document.getElementById('rst-btn');
const mode2pButton = document.getElementById('m2');
const mode3pButton = document.getElementById('m3');
const modal = document.getElementById('modal')
const closeModalButton = document.getElementById('modal-close-button');

const modalMsg = document.getElementById('pop-msg');


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
    const K = winConditionLength;//nyeresi feltetel hossza

    const curPlayers = gameMode === '2P' ? player2P : player3P; // melyik jatekos lista kell

    for (const player of curPlayers) {//minden jatekosra ellenorizzuk a nyeresi felteteleket
        for (let row = 0; row < N; row++) {//sorok ellenőrzése
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

        for (let col = 0; col < N; col++) {//oszlopok ellenőrzése
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

        // másodlagos átló ellenőrzése
        for (let row =0; row <= N; row++) {
            for (let col = N - 1; col <= K - 1; col--) {
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

        for (let row =0; row <= N; row++) {
            for (let col = 0; col < N; row++) {
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

createGameBoard();
statusDisplay.textContent = currentPlayerTurn(currentPlayer);

