const statusDisplay = document.getElementById('status');
const gameBoard = document.getElementById('game-board');
const resetButton = document.getElementById('rst-btn');
const mode2pButton = document.getElementById('m2');
const mode3pButton = document.getElementById('m3');



let gameActive = true;
let currentPlayer = 'X';
let gameState = [];
let gameMode = '2P';
let boardSize = 3;
const winConditionLength = 3;


const player2P = ['X', 'O'];
const player3P = ['X', 'O', 'Z'];

