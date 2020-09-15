
const suits = ["D", "H", "S", "C"];
const values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q","K", "A"];
let deck = new Array();

/**
 ****** DECK CREATION AND SHUFFLE ******
 */

function newDeck() {

    deck = new Array();

    // 1. Loops through each array and pairs them up into a new object in a "Deck" Array
    for (x = 0; x < values.length; x++) {

        for (i = 0; i < suits.length; i++) {

            // 2. Creates a seperate variable holding score values.
            let trueValue = parseInt(values[x]);

            // 3. Assign value for special cards.
            if (values[x] == "J" || values[x] == "Q" || values[x] == "K") {
                trueValue = 10;
            };
            if(values[x] == "A") {
                trueValue = 11;
            }

            // 4. New card Array to be dealt.
            let card = {Value: values[x], Suit: suits[i], TrueValue: trueValue};

            deck.push(card);
        };
    };
};

// Shuffle
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}


/**
 ****** PLAYERS ******
 */

let player0, player1, players;

function Player(id, score, hand) {
    this.id = id,
    this.score = score
    this.hand = hand;
};

player0 = new Player(0, 0, []);
player1 = new Player(1, 0, []);
players = [player0, player1];

/**
 ****** SERVING ******
 */

function dealDeck() {
    for (i = 0; i < 2; i++) {

        for (x = 0; x < players.length; x++) {
            let card = deck.pop()
            players[x].hand.push(card);
        };
    };
};


/**
 ****** START GAME ******
 
*/

function startGame() {
    newDeck();
    shuffle(deck);
    dealDeck();
    renderDealtCards(0);
    renderDealtCards(1);
    renderScore(0);
    renderScore(1);
};
 

/****RENDER CARDS AND SCORE IN UI****/

// Renders cards dealt at the start of the game
function renderDealtCards(activePlayer){

    for (i = 0; i < players[activePlayer].hand.length; i++) {
        let cardID, newCard;
        
        cardID = players[activePlayer].hand[i].Value + players[activePlayer].hand[i].Suit;  

        newCard = `<img class="playcard" src="img/${cardID}.jpg" alt="card back">`;

        document.querySelector(`.player-container-${activePlayer}`).insertAdjacentHTML('beforeend', newCard);
    };
};

// Renders the score at the start of the game  in the UI
function renderScore(activePlayer){

    for (i = 0; i < players[activePlayer].hand.length; i++) {
        let score, newScore;

        score = players[activePlayer].hand[i].TrueValue;

        players[activePlayer].score += score;

        newScore = players[activePlayer].score;

        document.querySelector(`#score-${activePlayer}`).textContent = String(newScore);
    };
};

// Adds new card and score with the card button, same as the starter but without the loop
function createNewCard(){

    let card, cardScore, cardImage, newScore, newCard;

    card = deck.pop();
    cardScore = card.TrueValue;

    cardImage = card.Value + card.Suit;

    players[activePlayer].hand.push(card);
    newScore = players[activePlayer].score += cardScore;

    newCard = `<img class="playcard" src="img/${cardImage}.jpg" alt="card back">`;

    document.querySelector(`.player-container-${activePlayer}`).insertAdjacentHTML('beforeend', newCard);

    document.querySelector(`#score-${activePlayer}`).textContent = String(newScore);
};


/*******************  GAME PARAMETERS  *******************/

/**** HOUSE 'AI' ****/

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
};

// AI is certain to pick up.
function certain() {

    if (players[activePlayer].score <=12) {

        setTimeout(function(){ 

            createNewCard(); 
            scoreCompare(); 
            highChance();

        }, 500);   
    };
};

// likely of picking up.
function highChance() {

    //Compares current scores, if the AI's score is between these parameters and generates a certain number, it will pick up. This is the same with all 'chance' functions.

    let highChance = getRandomInt(6);

    if (players[1].score > 12 && players[1].score <=15  && highChance <= 4) {

        setTimeout(function(){ 

            createNewCard();
            scoreCompare(); 
            mediumChance();

        }, 1000);
    };
};

// Unlikely possibility of picking up.
function mediumChance() {

    let mediumChance = getRandomInt(6);
   
    if (players[activePlayer].score >= 16 && players[activePlayer].score <= 17 && mediumChance <= 2) {
        setTimeout(function(){ 

            createNewCard();
            scoreCompare();  
            lowChance()

        }, 1500);
    };
};

// Almost no chance of picking up a card.
function lowChance() {

    let lowChance = getRandomInt(6)

    if (players[activePlayer].score >= 18 && players[activePlayer].score <= 19 && lowChance <= 1) {
        setTimeout(function(){ 
    
            createNewCard();
            scoreCompare(); 
    
        }, 2000);
    };
};


/**** COMPARING THE SCORE AT THE START AND THROUGHOUT ****/

// This function compares the scores at the start.
function startParameters() {
    lostColour = "#990000";
    wonColour = "#003399";
    
    if (activePlayer === 0) {
        if (players[activePlayer].score > 21) {

            document.getElementById('name-0').style.color = lostColour;
            document.getElementById('name-0').textContent = "LOSER";

            document.getElementById('name-1').style.color = wonColour;
            document.getElementById('name-1').textContent = "WINNER!";

            console.log('should work')
        };

    } else if (activePlayer === 1) {
        if (players[activePlayer].score > 21) {

            document.getElementById('name-1').style.color = lostColour;
            document.getElementById('name-1').textContent = "LOSER";

            document.getElementById('name-0').style.color = wonColour;
            document.getElementById('name-0').textContent = "WINNER!";  
        };
    };
};

// This function compares the scores during the AI's turn and executes UI change.
function scoreCompare() {
    let lostColour, wonColour;

    lostColour = "#990000";
    wonColour = "#003399";

    startParameters()
    
    setTimeout(function(){ 
        if (players[1].score === players[0].score && players[1].score < 22) {
    
            document.getElementById('name-0').style.color = wonColour;
            document.getElementById('name-0').textContent = "DRAW!";
    
            document.getElementById('name-1').style.color = wonColour;
            document.getElementById('name-1').textContent = "DRAW!";
    
        } else if (players[1].score > players[0].score && players[1].score < 22) {

            document.getElementById('name-0').style.color = lostColour;
            document.getElementById('name-0').textContent = "LOSER";

            document.getElementById('name-1').style.color = wonColour;
            document.getElementById('name-1').textContent = "WINNER!!";

        } else if (players[1].score < players[0].score && players[0].score < 22) {

            document.getElementById('name-1').style.color = lostColour;
            document.getElementById('name-1').textContent = "LOSER";

            document.getElementById('name-0').style.color = wonColour;
            document.getElementById('name-0').textContent = "WINNER!";

        } else if (players[1].score > 22) {

            document.getElementById('name-1').style.color = lostColour;
            document.getElementById('name-1').textContent = "LOSER";

            document.getElementById('name-0').style.color = wonColour;
            document.getElementById('name-0').textContent = "WINNER!";

        } else if (players[0].score > 22) {

            document.getElementById('name-0').style.color = lostColour;
            document.getElementById('name-0').textContent = "LOSER";

            document.getElementById('name-1').style.color = wonColour;
            document.getElementById('name-1').textContent = "WINNER!";

        } else if (players[1].score === 21 && players[1].score > players[0].score) {

            console.log('it should work');
            document.getElementById('name-0').style.color = lostColour;
            document.getElementById('name-0').textContent = "LOSER";

            document.getElementById('name-1').style.color = wonColour;
            document.getElementById('name-1').textContent = "WINNER!";
        };
    }, 2100);
}


/**** SWITCH BETWEEN PLAYER AND AI ****/

let activePlayer = 0;

startGame();

document.querySelector('.button-hold').addEventListener('click', () => {

    if (activePlayer === 0){

        activePlayer = 1
        scoreCompare();

        document.querySelector('.player-1-panel').classList.toggle('active')
        document.querySelector('.player-0-panel').classList.toggle('active');

        document.getElementById('hold-id').classList.remove('button-hold');
        document.getElementById('card-one-id').classList.remove('card-one');
    };


    // HOUSE AI'S TURN TO PLAY //

    if (activePlayer === 1) {

        // Checks the score
        if (players[0].score > 21) {

            console.log("house wins")

        } else if (players[1].score <= players[0].score) {

            // Function calls to check probability to play
            certain();
            highChance();
            mediumChance();
            lowChance();
            scoreCompare();
        };
    };
});


/**** DECK CARD CREATOR ****/

document.querySelector('.card-one').addEventListener('click', () => {

    createNewCard();

    startParameters();

    if (players[0].score > 21) {
        
        document.getElementById('hold-id').classList.remove('button-hold');
        document.getElementById('card-one-id').classList.remove('card-one');

    };

});