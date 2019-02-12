

var wordBank = [{
    name: "Princess Peach",
    art: "<img src='assets/images/8-bit-peach.png'>"
}, {
    name: "Donkey Kong",
    art: "<img src='assets/images/donkey-kong.jpg'>"
}, {
    name: "Luigi",
    art: "<img src='assets/images/luigi.jpg'>"
}, {
    name: "Koopalings",
    art: "<img src='assets/images/koopalings.png'>"
}, {
    name: "Rosalina",
    art: "<img src='assets/images/rosalina.jpg'>"
}, {
    name: "Diddy Kong",
    art: "<img src='assets/images/diddy.png'>"
}, {
    name: "Mushroom Kingdom",
    art: "<img src='assets/images/mushroom-kingdom.jpg'>"
}, {
    name: "Dr Mario",
    art: "<img src='assets/images/dr-mario.png'>"
}, {
    name: "Bowser",
    art: "<img src='assets/images/bowser.png'>"
}, {
    name: "Fire Flower",
    art: "<img src='assets/images/fire-flower.jpg'>"
}, {
    name: "One-Up!",
    art: "<img src='assets/images/galaga.jpg'>"
}, {
    name: "Goomba",
    art: "<img src='assets/images/ghosts-n-goblins.jpg'>"
}, {
    name: "Waluigi",
    art: "<img src='assets/images/gradius.jpg'>"
}, {
    name: "Bullet Bill",
    art: "<img src='assets/images/ice-climber.jpg'>"
}, {
    name: "Buzzy Beetle Shell",
    art: "<img src='assets/images/kid-icarus.jpg'>"
}, {
    name: "Fire Flower",
    art: "<img src='assets/images/kirby.jpg'>"
}, {
    name: "Mario Bros",
    art: "<img src='assets/images/mario-bros.jpg'>"
}, {
    name: "Hammer Suit Mario",
    art: "<img src='assets/images/mega-man-2.jpg'>"
}, {
    name: "Warp Tunnel",
    art: "<img src='assets/images/metroid.jpg'>"
}, {
    name: "Chain Chomp",
    art: "<img src='assets/images/ninja-gaiden.png'>"
}, {
    name: "Mystery Mushroom",
    art: "<img src='assets/images/pac-man.jpg'>"
}, {
    name: "Red Coins",
    art: "<img src='assets/images/punch-out.png'>"
}, {
    name: "King Boo",
    art: "<img src='assets/images/startropics.jpg'>"
}, {
    name: "Super Star",
    art: "<img src='assets/images/super-c.png'>"
}, {
    name: "Super Mario Bros",
    art: "<img src='assets/images/super-mario-bros.jpg'>"
}, {
    name: "Super Mario Galaxy",
    art: "<img src='assets/images/mario2.jpg'>"
}, {
    name: "Shy Guy Beach",
    art: "<img src='assets/images/mario3.jpg'>"
}, {
    name: "Wing Cap",
    art: "<img src='assets/images/tecmo-bowl.jpg'>"
}, {
    name: "WHAAHAAHAA",
    art: "<img src='assets/images/zelda.jpg'>"
}, {
    name: "Bowser's Castle",
    art: "<img src='assets/images/zelda2.jpg'>"
}];


//setting up my global variables that I'll need
var gameWord = 0;
var wins = 0;
var losses = 0;
var guessesLeft = 6;
var blanks = [];
var correctGuesses = [];
var incorrectGuesses = [];
var correctIndex = [];
var splicedWord = [];
var boxArtImage = document.getElementById("boxArt");
var alphabetBank = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "2", "3"]
var gameStart = false;
var gameOver = false;
var gameIndex = 0;

//The audio clips I'll be calling later.
var loseSound = new Audio('assets/sounds/smb_mariodie.mp3');
var winSound = new Audio('assets/sounds/smb_stage_clear.mp3');
var powerOffSound = new Audio('assets/sounds/smb_gameover.mp3');
var powerOnSound = new Audio('assets/sounds/smb_powerup.mp3');
var coinSound = new Audio('assets/sounds/smb_coin.mp3');
var blockSound = new Audio('assets/sounds/smb_breakblock.mp3');
var gameOverSound = new Audio('assets/sounds/smb_world_clear.mp3');
var almostDead = new Audio('assets/sounds/smb_warning.mp3');


//Shortcut way for me to call an HTML id
var displayIncorrectGuesses = document.getElementById('wrongGuesses');
var displayPowerLight = document.getElementById('powerLight');
var displayCorrectGuesses = document.getElementById('blankWord');
var displayWins = document.getElementById('wins');
var displayLosses = document.getElementById('losses');
var displayChances = document.getElementById('chancesLeft');
var displayBoxArt = document.getElementById('boxArt');
var displayHungMario = document.getElementById('hungMario');
var displayWinOrLose = document.getElementById('winOrLose');
var displayPlayagain = document.getElementById('playAgain');

//This "turns off the game" when you press the power button by clearing everything.
function powerOff() {
    powerOffSound.play();

    displayPowerLight.innerHTML = "<img src='assets/images/power-off.png' alt='power n'>";
    displayCorrectGuesses.innerHTML = "";
    displayIncorrectGuesses.innerHTML = "";
    displayWins.innerHTML = "";
    displayLosses.innerHTML = "";
    displayBoxArt.innerHTML = "<img src='assets/images/boo.png' alt='boo'>";
    displayChances.innerHTML = "";
    displayHungMario.innerHTML = "";
    displayPlayagain.innerHTML = "";
    displayWinOrLose.innerHTML = "";
    
    //Resets all the variables
    gameStart = false;
    gameWord = 0;
    blanks = [];
    correctGuesses = [];
    incorrectGuesses = [];
    correctIndex = [];
    wins = 0;
    losses = 0;
    guessesLeft = 6;
    
    for (var i = 0; i < splicedWord.length; i++) {

        //This pushes all of the names that got taken from wordBank into a different array, and then the games are taken out of wordBank
        wordBank.push(splicedWord[i]);
        splicedWord.splice(i, 1);
    }


}

var hangman = {
    newGame: function() {


        gameStart = true;

        //This will when as long as there are games left in the game array
       

        gameOver = false;

        powerOnSound.play();

        //The random number used for referencing the wordBank array's index
        gameIndex = Math.floor(Math.random() * wordBank.length);

        //Reset all the variables for the new game
        gameWord = 0;
        guessesLeft = 6;
        blanks = [];
        correctGuesses = [];
        incorrectGuesses = [];
        correctIndex = [];
        displayWins.innerHTML = wins;
        displayLosses.innerHTML = losses;
        displayChances.innerHTML = guessesLeft;
        gameWord = wordBank[gameIndex];

        displayPowerLight.innerHTML = "<img src='assets/images/power-on.png' alt='power n'>";
        displayWinOrLose.innerHTML = "";
        displayPlayagain.innerHTML = "";
        displayIncorrectGuesses.innerHTML = "";
        gameStart = true;


        //A loop to push out special characters and underscores to actually play the game
        for (var i = 0; i < gameWord.name.length; i++) {
            if (gameWord.name[i] === " ") {
                blanks.push("\u00A0");
            } else if (gameWord.name[i] === "\'") {
                blanks.push("\'");
            } else if (gameWord.name[i] === "\:") {
                blanks.push("\:");
            } else if (gameWord.name[i] === "\-") {
                blanks.push("\-");
            } else if (gameWord.name[i] === "\!") {
                blanks.push("\!");
            } else {
                blanks.push("_");
            }
        }

        //Makes the blanks display on the screen before you press any keys
        displayCorrectGuesses.textContent = blanks.join(" ");

        //Updates the picture of Mario being hung depending on how many chances are left
        displayHungMario.innerHTML = "<img src='assets/images/" + guessesLeft + "-chances-left.png' alt='Hangman Progress'>";

  //This is the game over screen when the wordBank array is depleted.




},

        guessCheck: function(UserGuess) {
            UserGuess = UserGuess.toLowerCase();
            //This checks to see if the User Guess input was found in the array or not, and that the game is not over.
            if (gameWord.name.toLowerCase().indexOf(UserGuess) >= 0 && correctGuesses.indexOf(UserGuess) < 0 && gameOver === false) {

                correctIndex = [];
                for (var i = 0; i < gameWord.name.length; i++) {
                    if (gameWord.name[i].toLowerCase() === UserGuess) {
                        correctIndex.push(i);
                    }
                }

                for (var i = 0; i < correctIndex.length; i++) {
                    blanks[correctIndex[i]] = UserGuess;
                }

                displayCorrectGuesses.textContent = blanks.join(" ");
                coinSound.play();


            } else if (gameWord.name.indexOf(UserGuess) < 0 && alphabetBank.indexOf(UserGuess) >= 0 && incorrectGuesses.indexOf(UserGuess.toUpperCase()) < 0 && gameOver === false) {
                guessesLeft = guessesLeft - 1;
                chancesLeft.innerHTML = guessesLeft;
                document.getElementById("hungMario").innerHTML = "<img src='assets/images/" + guessesLeft + "-chances-left.png' alt='Hangman Progress'>";
                incorrectGuesses.push(UserGuess.toUpperCase());
                displayIncorrectGuesses.innerHTML = incorrectGuesses.join(" ");
                blockSound.play();
                if (guessesLeft === 1) {
                	almostDead.play();
                }
            }



        },

        endGame: function() {
            if (wordBank.length === 0) {
                displayWinOrLose.innerHTML = "GAME OVER";
    displayHungMario.innerHTML = "";
    displayCorrectGuesses.innerHTML = "";
    displayPlayagain.innerHTML = "";
    gameOverSound.play();
    for (var i = 0; i < splicedWord.length; i++) {

        //This pushes all of the names that got taken from wordBank into a different array, and then the games are taken out of wordBank
        wordBank.push(splicedWord[i]);
        splicedWord.splice(i, 1);

        //These messages appear depending on your score.
        if (wins === 30) {
            displayHungMario.innerHTML = "<p>Holy cow!</p>" + 
            "<p>You got all 30 games correct! You either know your NES CLassic, or you're incredible lucky. I suppose you could also be skilled at hangman, but lets be real here.</p>" +
            "<p>Congratulations!</p>";
        } else if (wins >= 25) {
            displayHungMario.innerHTML = "<p>You got " + wins + " correct. That's pretty good!</p>" +
            "<p>I know you must be disappointed that you didn't get all 30. It's ok. You'll get them next time. You had a decent showing!</p>";
        } else if (wins >= 18) {
            displayHungMario.innerHTML = "<p>" + wins + " correct isn't horrible.</p>" +
                "<p>I've definitely seen worse. You obviously show some recollection of NES games, and I refuse to give up hope on you just yet</p>";
        } else if (wins >= 10) {
            displayHungMario.innerHTML = "<p>Come on! You only got " + wins + " right!?</p>" +
                "<p>You're barely even trying. I feel like you could have done just as good if you didn't know anything and were just pressing random buttons like a madman. Are you some sort of madman?</p>";
        } else if (wins >= 5) {
            displayHungMario.innerHTML = "<p>" + wins + " wins? Really?</p>" +
            "<p>I understand if you're not a fan of Nintendo. Not all of us are. Sure, maybe all the cool kids are, but not everyone can be a cool kid.</p>";
        } else if (wins >= 0 ) {
            displayHungMario.innerHTML = "<p>" + wins + "? " + wins + " is your score?</p>" +
                "<p>You had to try to do this bad. Way to go. No one is impressed. Just go home. You're probably no fun at parties either.</p>";
        }


    }

}
            },
        

        gameProgress: function() {


            if (blanks.indexOf("_") < 0 && guessesLeft > 0) {
                wins++;
                displayWins.innerHTML = wins;
                displayWinOrLose.innerHTML = "You Won!";
                displayPlayagain.innerHTML = "<p>Play Again</p>";
                winSound.play();
                displayBoxArt.innerHTML = gameWord.art;
                correctGuesses = [];

                //I made this 0 right here so you wouldn't keep getting wins for typing random letters after you won
                guessesLeft = 0;
                gameOver = true;
                splicedWord.push(gameWord);
                wordBank.splice(gameIndex, 1);
                document.getElementById("howToWrapper").innerHTML = "";


                hangman.endGame();


            } else if (guessesLeft <= 0 && blanks.indexOf("_") >= 0) {
                losses++;
                displayLosses.innerHTML = losses;
                loseSound.play();
                displayWinOrLose.innerHTML = "You Lose!";
                displayHungMario.innerHTML = "<img src='assets/images/0-chances-left.png' alt='Hangman Progress'>";
                displayPlayagain.innerHTML = "<p>Play Again</p>";
                displayBoxArt.innerHTML = "<img src='assets/images/nes-classic-edition.png' alt='NES Classic'>";
                guessesLeft = 6;
                gameOver = true;
                splicedWord.push(gameWord);
                wordBank.splice(gameIndex, 1);
                document.getElementById("howToWrapper").innerHTML = "";

                hangman.endGame();


            }
        }
    }

displayPlayagain.onclick = function() {
    if (gameOver === true) {
        hangman.newGame();
    }
};

document.getElementById("startBtn").onclick = function() {
    if (gameStart === false) {
        hangman.newGame();
    } else if (gameStart === true) {
        powerOff();
    }

};

document.getElementById("resetBtn").onclick = function() {
    if (gameStart === true) {
        powerOff();
        hangman.newGame();
    }
};


document.onkeyup = function(event) {
    var UserGuess = event.key;
    hangman.guessCheck(UserGuess);
    hangman.gameProgress();
}
