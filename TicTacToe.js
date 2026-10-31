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

function chekWin() {
    const N = boardSize;//tabla merete
    const K = winLen;//nyeresi feltetel hossza

    
    const currentPlayer = gameMode ==='2P' ? p2 : p3; // melyik jatekos lista kell

}