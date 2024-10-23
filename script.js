const board = document.getElementById('game-board');
const restartButton = document.getElementById('restartButton');

const cardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
let cards = [...cardValues, ...cardValues];
let flippedCards = [];
let matchedPairs = 0;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createCard(value) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = value;
    card.addEventListener('click', flipCard);
    return card;
}

function initializeGame() {
    board.innerHTML = '';
    flippedCards = [];
    matchedPairs = 0;
    shuffle(cards);
    cards.forEach(value => {
        const card = createCard(value);
        board.appendChild(card);
    });
}

function flipCard() {
    if (flippedCards.length === 2) return;
    const card = this;

    if (card.classList.contains('flipped') || card.classList.contains('matched')) return;

    card.classList.add('flipped');
    card.textContent = card.dataset.value;
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        checkForMatch();
    }
}

function checkForMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.value === card2.dataset.value) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedPairs++;
        if (matchedPairs === cardValues.length) {
            setTimeout(() => alert('Congratulations! You won!'), 500);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.textContent = '';
            card2.textContent = '';
        }, 1000);
    }
    flippedCards = [];
}

restartButton.addEventListener('click', initializeGame);

initializeGame();
