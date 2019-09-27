var game = {
    wordBank: wordBank,
    word: "",
    correctGuesses: [],
    incorrectGuesses: [],
    wins: 0,
    remainingGuesses: 0,
    hasStarted: false,
    initialize: function() {
        this.word = wordBank[Math.floor(Math.random() * wordBank.length)];
        this.correctGuesses = []
        this.incorrectGuesses = [];
        this.remainingGuesses = 10;
        this.hasStarted = false;
        for (let i = 0; i < this.word.length; i++) {
            this.correctGuesses.push("_"); //initialize with underscores
        }
        
        this.updateCorrectGuesses();
    },
    startGame: function() {
        this.updateCorrectGuesses;
        this.hasStarted = true;
    },
    processGuess: function(userGuess) {
        if (this.word.includes(userGuess)) {
            for (let i = 0; i < this.word.length; i++) {
                if (this.word[i] === userGuess) {
                    this.correctGuesses[i] = userGuess
                }
                this.updateCorrectGuesses();
            }
        }
    },
    updateCorrectGuesses: function() {
        let text = "";
        for (let i = 0; i < this.correctGuesses.length; i++) {
            text = text + this.correctGuesses[i] + " ";
        }
        document.getElementById("wordDisplay").innerHTML = text;
    },
    displayStartPrompt: function() {
        document.getElementById("wordDisplay").innerHTML = "Press any key to start!";
    }
};

game.displayStartPrompt();

document.onkeyup = function(event) {
    if (!game.hasStarted) {
        game.initialize();
        game.startGame();
    } else {
        game.processGuess(event.key);
    }  
}