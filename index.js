var Word = require("./word.js");
var Letter = require("./letter.js");
var inquirer = require("inquirer");

//Word list, random word selected from list
var wordChoices = ["BLADE RUNNER", "ALIENS", "TERMINATOR", "STAR WARS", "MAD MAX", "GRAVITY", "THE MATRIX", "METROPOLIS", "EX MACHINA", "AVATAR"];
var wordIndex = Math.floor(Math.random() * wordChoices.length);
var newWord = new Word(wordChoices[wordIndex]);
var Guesses = 10;

function startHangman(){
	// Displays word to guess as a string of blanks and letters
	console.log(newWord.spaceDisplay() + "\n");
	// Game ends (loss) if no more guesses remain
	if (newWord.incorrectGuess >= Guesses){
		console.log("\x1b[31m%s\x1b[0m", "Sorry, out of guesses!");
		// Player can continue or end the game at this point
		inquirer.prompt([
			{
				name: "confirm",
				type: "confirm",
				message: "Would you like to play another round?"
			}
		]).then(function(response) {

			if (!response.confirm) {
				console.log("\n\nThanks for playing!\n\n");
				return;
			} else {
				console.log("\nOK let start, here we go!\n");
				newWord.incorrectGuess = 0;
				wordIndex = Math.floor(Math.random() * wordChoices.length);
				newWord = new Word(wordChoices[wordIndex]);
				startHangman();
			} 
		});
		return;
	}
	// Prompt to guess letter with input validation
	inquirer.prompt([
		{
			name: "letter",
			type: "input",
			message: "Guess a letter! ",
			validate: function validateGuess(letter){
	        	if (letter.length > 1) {
	        		console.log("\n\x1b[31m%s\x1b[0m", "Enter just one letter..\n");
	        		return;
	        	} else if (!letter.match(/^[a-zA-Z]*$/)) {
	        		console.log("\n\x1b[31m%s\x1b[0m", "Not a letter! Try again..\n");
	        		return;
	        	} else {
	        		return true;
	        	}
			}
		}
	]).then(function(letterInput){ 

		var letter = letterInput.letter.toUpperCase(); // Changes input to capital letter
		// Check for input letter in word and change display
		newWord.checkLetter(letter);
		newWord.spaceDisplay();
		// Check word is complete and guesses remain.  Game ends as a win.
		if(newWord.wordComplete()){ 
			console.log("\n\x1b[1;5;35m%s\x1b[0m", "Congratulations! The answer is '" + newWord.spaceDisplay() + "'. Let's play again!\n");
			wordIndex = Math.floor(Math.random() * wordChoices.length);
			newWord = new Word(wordChoices[wordIndex]);
		}
		// If the word is not completed and guesses remain, prompt to guess again
		console.log("You have " + (Guesses - newWord.incorrectGuess) + " guesses remaining\n");
		startHangman();
		}
  );
};
// Start the game
console.log("\n\x1b[1;33m%s\x1b[0m","Welcome to SiFi Movie Hangman, Good Luck & have fun!!!");
startHangman();

