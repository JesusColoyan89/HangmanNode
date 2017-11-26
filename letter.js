var letter = function(letter){
	this.character = letter;
	this.appear = false;
	this.letterRender = function() {
		if(this.character == " "){
			this.appear = true;
			return " ";
		}if(this.appear === false){
			return " _ ";
		}else{
			return this.character;
		}
	};
};

module.exports = letter;