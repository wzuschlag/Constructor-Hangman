function Letter(letter) {
	this.letter = letter;
	this.showLetter = false;
};

// Determines if letter has been guessed (display or blank)
Letter.prototype.render = function() {
	if(this.letter == " "){ //renders a blank.     
      this.showLetter = true; //Confirm function checks for blanks and makes them true.
      return "  ";
    }

	if (this.showLetter) {
		return " " + this.letter + " ";		
	} 
	else {
		return " _ ";		
	}
};

module.exports = Letter;
