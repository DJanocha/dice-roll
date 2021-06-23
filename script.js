'use strict';

//get elements from DOM
let gameActive = true;
let currentPlayer = 1;
const pointsToWin = 10;
const numberOfPlayers = 2;
let holdButton = document.querySelector('.btn--hold');
let newGameButton = document.querySelector('.btn--new')
let rollButton = document.querySelector('.btn--roll');
let scoreElements = [document.getElementById('score--0'), document.getElementById('score--1')]
let diceElement = document.querySelector('.dice')
let players = [document.querySelector('.player--0'), document.querySelector('.player--1')] // 'handler' to both players to modify their inner text or sth
let currents = [document.getElementById('current--0'), document.getElementById('current--1')] //current pointf for each player to display


let currentScore = 0;

//functions
function saveCurrent() {

    scoreElements[currentPlayer].innerText = Number(scoreElements[currentPlayer].innerText) + currentScore;
    currentScore = 0;
    currents[currentPlayer].innerText = currentScore;
    if (Number(scoreElements[currentPlayer].innerText) >= pointsToWin) {//if player wins
        players[currentPlayer].classList.add('player--winner');
        gameActive = false;
    }
    return; //if first player happens to be the active one, there's no need to check the other one

}
function isActive(player) {//check if given player is active (has player--active class)
    if (player.classList.contains('player--active'))
        return true;
    return false
}

function rollDice() {
    if (!gameActive) return;
    let randomNumber = Math.floor(Math.random() * 6) + 1; // generate random number from <1;6>
    diceElement.classList.remove('hidden'); // show the dice
    diceElement.src = `img/dice-${randomNumber}.png`; // change the image corresponding to the number randomly generated

    if (randomNumber < 2) {
        currentScore = 0
        togglePlayers();
    }
    else
        currentScore += randomNumber;
    currents[currentPlayer].innerText = currentScore;
}
function togglePlayers() {
    for (let a = 0; a < players.length; ++a)
        players[a].classList.toggle('player--active');
    currentPlayer = 1 - currentPlayer; // switch the current player from 0 to 1 and the other way around
}
function reset() {
    currentPlayer = 1;
    diceElement.classList.add('hidden'); //hide the dice
    for (let a = 0; a < players.length; ++a) {
        players[a].classList.remove('player--winner') // after resetting make both players not winners (set to init state)
        scoreElements[a].innerText = 0;
        currents[a].innerText = 0;
    }
    currentScore = 0;
    gameActive = true;
}

//add eventListeners
holdButton.addEventListener('click', function () {
    if (gameActive) {
        saveCurrent();
        togglePlayers();
    }
})
rollButton.addEventListener('click', rollDice);
newGameButton.addEventListener('click', reset);




// initialize:

reset();




