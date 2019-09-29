var game = {
    wordBank: wordBank,
    word: "",
    correctGuesses: [],
    incorrectGuesses: [],
    wins: 0,
    remainingGuesses: 0,
    hasStarted: false,
    hasFinished: false,
    startMusicHasPlayed: false,
    audio: {
        start: new Audio("assets/sound/looney-tunes-opening-theme.mp3"),
        correct: new Audio("assets/sound/correct-guess.mp3"),
        lose: new Audio("assets/sound/lose.mp3")
    },

    initialize: function() {
        //return appropriate properties to initial values
        this.word = wordBank[Math.floor(Math.random() * wordBank.length)];
        this.correctGuesses = []
        this.incorrectGuesses = [];
        this.remainingGuesses = 10;
        this.hasStarted = false;
        this.hasFinished = false;

        //Only playing start music on first round
        if (!this.startMusicHasPlayed) {
            this.audio.start.play();
            this.startMusicHasPlayed = true;
        }

        for (let i = 0; i < this.word.length; i++) {
            if (this.word[i] === " ") {
                this.correctGuesses.push(" "); //spaces where appropriate
            } else {
                this.correctGuesses.push("_"); //initialize with underscores
            }
        }
    },

    startGame: function() {
        this.updateDisplay();
        this.hideStartPrompt();
        this.hasStarted = true;
    },

    processGuess: function(userGuess) {
        //Gandalfing duplicate guesses
        if (this.correctGuesses.includes(userGuess) || this.incorrectGuesses.includes(userGuess) || this.hasFinished) {
            return; //shall not pass
        }

        //Fill the guess into either correctGuesses or incorrectGuesses
        if (this.word.includes(userGuess)) {
            for (let i = 0; i < this.word.length; i++) {
                if (this.word[i] === userGuess) {
                    this.correctGuesses[i] = userGuess
                }
            }
        } else {
            this.incorrectGuesses.push(userGuess);
            this.remainingGuesses--;
        }
        this.checkGameStatus();
        this.updateDisplay();
    },

    checkGameStatus: function() {
        //If no underscores remain in correctGuesses, the game is won
        let winner = !this.correctGuesses.includes("_");
        let loser = this.remainingGuesses == 0;

        if ( winner || loser ) {
            this.hasFinished = true;
            if (winner) {
                this.audio.correct.play();
                this.wins++;
            } else {
                this.audio.lose.play();
                this.fillMissingLetters();
            }
        }

        if (this.hasFinished) {
            this.hasStarted = false;
            this.displayStartPrompt();
        }
    },

    //all-in-one display update
    updateDisplay: function() {
        this.updateIncorrectGuesses();
        this.updateCorrectGuesses();
        this.updateRemainingGuesses();
        this.updateWins();
    },

    fillMissingLetters: function() {
        //Fills in any letter that weren't guessed, in red.
        for (let i = 0; i < this.word.length; i++) {
            if (this.correctGuesses[i] === "_") {
                this.correctGuesses[i] = '<span class="text-danger">' + this.word[i] + '</span>';
            }
        }
    },

    updateCorrectGuesses: function() {
        document.getElementById("wordDisplay").innerHTML = this.stringifyArray(this.correctGuesses);
    },

    updateIncorrectGuesses: function() {
        document.getElementById("lettersGuessed").innerHTML = this.stringifyArray(this.incorrectGuesses);
    },

    updateRemainingGuesses: function() {
        document.getElementById("remainingGuesses").innerHTML = this.remainingGuesses;
    },

    updateWins: function() {
        document.getElementById("wins").innerHTML = this.wins;
    },

    displayStartPrompt: function() {
        document.getElementById("startPrompt").innerHTML = "Press any key to start!";
    },

    hideStartPrompt: function() {
        document.getElementById("startPrompt").innerHTML = "";
    },

    //Helper method for converting array -> string
    stringifyArray: function(array) {
        let text = "";
        for (let i = 0; i < array.length; i++) {
            text = text + array[i];
        }
        return text;
    }
};

game.displayStartPrompt();

document.onkeyup = function(event) {
    if (!game.hasStarted) {
        game.initialize();
        game.startGame();
    } else if ((event.keyCode >= 65 && event.keyCode <= 90)) {
        game.processGuess(event.key);
    }
}