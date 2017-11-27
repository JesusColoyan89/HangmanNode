var inquirer = require('inquirer');
var word = require('./Word.js');
var bank = require('./bank.js');
var isLetter = require('is-letter');
var letter = require('./letter.js');

require('events').EventEmitter.prototype._maxListeners = 100;

var hangman = {
	wordBank: bank.newWord.wordList,
	guessesRemaining: 10,
	guessedLetter: [],
	display: 0,
	currentWord: null,

	start: function(){
		var that = this;
		if(this.guessedLetter.length > 0) {
			this.guessedLetter = [];
		}

		inquirer.prompt([{
			name: "play",
			type: "confirm",
			message: "You Ready??"
		}]).then(function(answer) {
			if(answer.play){
				that.newGame();
			} else{
				console.log("Youre confusing me...");
			}
		})},

		newGame: function() {
			if(this.guessesRemaining === 10) {
				console.log("Lets begin!");

				var random = Math.floor(Math.random()*this.wordBank.length);
				this.currentWord = new word(this.wordBank[random]);
				this.currentWord.getLetters();
				console.log(this.currentWord.wordRender());
				this.promptUser();
			} else{
				this.resetGuesses();
				this.newGame();
			}
		},
		resetGuesses: function() {
			this.guessesRemaining = 10;
		},
		promptUser: function(){
			var that = this;

			inquirer.prompt([{
				name: "letterChosen",
				type: "input",
				message: "Pick a letter:",
				validate: function(val) {
					if(isLetter(val)) {
						return true;
					}else {
						return false;
					}
				}
			}]).then(function(letter) {
				var letterReturned = (letter.letterChosen).toUpperCase();
				var alreadyGuessed = false;
				for(var i =0; i<that.guessedLetter.length; i++){
					if(letterReturned ===that.guessedLetter[i]){
						alreadyGuessed = true;
					}
				}
				if(alreadyGuessed === false) {
					that.guessedLetter.push(letterReturned);


					var found = that.currentWord.checkLetter(letterReturned);
					if(found === 0){
						console.log("Whoops, wrong guess.");
						that.guessesRemaining--;
						that.display++;
						console.log('Remaining Guesses: ' + that.guessedLetter);
						console.log(that.currentWord.wordRender());
						console.log("Letters guessed: " + that.guessedLetter);
					}else{
						console.log("Correct!");
						if(that.currentWord.wordCheck() === true){
							console.log(that.currentWord.wordRender());
							console.log("Congrats, we've got a bigshot over here!!");
						}else{
							console.log('Guesses remaining: ' + that.guessesRemaining);
							console.log(that.currentWord.wordRender());
							console.log("Letters guessed: " + that.guessedLetter);
						}
					}
					if(that.guessesRemaining > 0 && that.currentWord.wordFound === false) {
						that.promptUser();
					}else if(that.guessesRemaining === 0){
						console.log('ITS OVAAAAAA!');
						console.log('The word you were looking for was: ' + that.currentWord.word);
					}
				} else{
					console.log("Letter already guessed!")
					that.promptUser();
				}
			});
		}
	}
hangman.start();