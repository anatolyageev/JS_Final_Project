const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let moves = 0;
let counter = document.querySelector(".moves");
let second = 0, minute = 0, hour = 0;
let timer = document.querySelector(".timer");
let interval;
const stars = document.querySelectorAll(".fa-star");
cards.forEach(card => card.addEventListener('click', flipCard));
let starsList = document.querySelectorAll(".stars li");
document.querySelector('.fa-repeat').addEventListener('click', startGame);

document.body.onload = startGame();

function flipCard() {
    if (lockBoard) {
        return;
    }
    if (this === firstCard) {
        return;
    }

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    moveCounter();
    ratingSet();
    checkForMatch();
}

function checkForMatch() {
    firstCard.dataset.planet === secondCard.dataset.planet ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
}

function resetFlip() {
    cards.forEach(card => {
        card.classList.remove('flip');
        card.addEventListener('click', flipCard);
    })
}

function resetRating() {
    for (var i = 0; i < stars.length; i++) {
        stars[i].style.color = "#FFD700";
        stars[i].style.visibility = "visible";
    }
}

function resetTimer() {
    second = 0;
    minute = 0;
    hour = 0;
    var timer = document.querySelector(".timer");
    timer.innerHTML = "0 mins 0 secs";
    clearInterval(interval);
}

function startGame() {
    resetFlip();
    resetRating();
    shuffle();
    resetTimer();
    moves = 0;
    counter.innerHTML = moves;
}

function startTimer() {
    interval = setInterval(function () {
        timer.innerHTML = minute + "mins " + second + "secs";
        second++;
        if (second == 60) {
            minute++;
            second = 0;
        }
        if (minute == 60) {
            hour++;
            minute = 0;
        }
    }, 1000);
}

function moveCounter() {
    moves++;
    counter.innerHTML = moves;
    //start timer on first click
    if (moves == 1) {
        second = 0;
        minute = 0;
        hour = 0;
        startTimer();
    }
}

function ratingSet() {
    if (moves > 10) {
        stars[2].style.visibility = "collapse";
    }
    else if (moves > 16) {
        stars[1].style.visibility = "collapse";
    }
}