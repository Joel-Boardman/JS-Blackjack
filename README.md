# JS-Blackjack
This is a pure Javascript blackjack game that puts the player up against an AI.

Notice - if you run this game, be sure to remove any ad-blockers on your browser. I ran into a few issues with it refusing to display certain cards.

RULES : 
- The goal of the game is to achieve the highest score against the AI, without breaching the score (21) limit.
- If either player breaches the score limit or loses any other way, the game will stop and will wait for you to restart it.


AI :
The House 'AI' generates a random number between 1 and 6 before its turn. Using this randomly generated number, will be run through certain 'IF' statements. These 'IF' statements require the AI's score to meet certain criteria (for example be between 12 and 15),  and if it meets this criteria AND if the randomly generated number meets its own conditions, the code will execute. 
For example :

    let highChance = getRandomInt(6);

    if (players[1].score > 12 && players[1].score <=15  && highChance <= 4) {

        setTimeout(function(){ 

            createNewCard();
            scoreCompare(); 
            mediumChance();

        }, 1000);
    };

Functions like this are set between likely to unlikely, and the higher the score, the less likely these commands will execute. This creates the illussion of risk for the AI, and with each turn it's reaction will be different.
