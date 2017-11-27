//requring letter
var letter = require("./letter.js");



function Word(word) {
	var that = this

	this.word = word;
	this.letters = [];
	this.wordFound = false;

	this.getLetters = function(){
		for(var i = 0; i<that.word.length; i++){
			var newLetter = new letter(that.word[i]);
			this.letters.push(newLetter);
		}
	};

	this.wordCheck = function() {
		if(this.letters.every(function(ltr){
			return ltr.appear === true;
		})){
			this.wordFound = true;
			return true;
		}
	};

	this.checkLetter = function(guessedLetter) {
		var wReturn = 0;
		this.letters.forEach(function(ltr){
			if(ltr.letter === guessedLetter){
				ltr.appear = true;
				wReturn++;
			}
		})
	return wReturn;
	};

	this.wordRender = function() {
		var display = '';
		this.letters.forEach(function(ltr){
			var currentLetter = ltr.letterRender();
			display+=currentLetter;
		});

		return display;
	};

}

module.exports = Word;
