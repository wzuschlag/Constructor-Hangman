var Letter = require("./letter.js");

function Word(word) {
	this.word = word;
	this.letters = [];
	this.guessedLetters = [];
	this.incorrectGuess = 0;

	for (var i = 0; i < this.word.length; i++) {
		this.letters.push(new Letter(this.word[i]));
	}
};
// Checks showLetter variable to render either letter or blank space
Word.prototype.spaceDisplay = function() {
	var string = "";
	for (var i = 0; i < this.letters.length; i++) {
		string += this.letters[i].render();
	}
	return string;
};
// Checks to see if the entire word has been guessed correctly
Word.prototype.wordComplete = function() {
	for (var i = 0; i < this.letters.length; i++) {
		if (!this.letters[i].showLetter) {
			return false;
		}
	}
	return true;
};
// Checks the letters array for a match and records the guess
Word.prototype.checkLetter = function(letter) {
	if (this.guessedLetters.indexOf(letter) > -1) {
		console.log("\n\x1b[31m%s\x1b[0m", "Letter '" + letter + "' Already guessed");
		return;
	}
	// Records guess
	this.guessedLetters.push(letter);
	// If letter is guessed correctly, change showLetter to true to render letter
	for (var i = 0; i < this.letters.length; i++) {
		if (this.letters[i].letter === letter) {
			this.letters[i].showLetter = true;
		}
	}
	// Check for guessed letter in word, if not record incorrect guess.
	if (this.word.indexOf(letter) > -1) {
		var letterIndex = this.word.indexOf(letter);
		if (!this.letters[letterIndex].showLetter) {
			return;
		}
		console.log("\n\x1b[32m%s\x1b[0m", "CORRECT!");
	} else {
		this.incorrectGuess++;
		console.log("\n\x1b[31m%s\x1b[0m", "INCORRECT!");
		return;
	}
};

module.exports = Word;