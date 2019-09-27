var game = {
    wordBank: wordBank,
    word: "",
    correctGuesses: [],
    incorrectGuesses: [],
    wins: 0,
    remainingGuesses: 0,
    hasStarted: false,
    hasFinished: false,

    initialize: function() {
        this.word = wordBank[Math.floor(Math.random() * wordBank.length)];
        this.correctGuesses = []
        this.incorrectGuesses = [];
        this.remainingGuesses = 10;
        this.hasStarted = false;
        this.hasFinished = false;

        for (let i = 0; i < this.word.length; i++) {
            this.correctGuesses.push("_"); //initialize with underscores
        }
    },

    startGame: function() {
        this.updateDisplay();
        this.hideStartPrompt();
        this.hasStarted = true;
    },

    processGuess: function(userGuess) {
        if (this.correctGuesses.includes(userGuess) || this.incorrectGuesses.includes(userGuess) || this.hasFinished) {
            return;
        }

        if (this.word.includes(userGuess)) {
            for (let i = 0; i < this.word.length; i++) {
                if (this.word[i] === userGuess) {
                    this.correctGuesses[i] = userGuess
                }
                // this.updateCorrectGuesses();
            }
        } else {
            this.incorrectGuesses.push(userGuess);
            this.remainingGuesses--;
        }
        this.checkGameStatus();
        this.updateDisplay();
    },

    checkGameStatus: function() {
        let winner = !this.correctGuesses.includes("_");
        let loser = this.remainingGuesses == 0;
        if ( winner || loser ) {
            this.hasFinished = true;
            if (winner) {
                this.wins++;
            }
        }

        if (this.hasFinished) {
            this.hasStarted = false;
            this.displayStartPrompt();
        }
    },

    updateDisplay: function() {
        this.updateIncorrectGuesses();
        this.updateCorrectGuesses();
        this.updateRemainingGuesses();
        this.updateWins();
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

    stringifyArray: function(array) {
        let text = "";
        for (let i = 0; i < array.length; i++) {
            text = text + array[i] + " ";
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