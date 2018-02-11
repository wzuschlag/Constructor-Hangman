var Word = require("./word.js");
var Letter = require("./letter.js");
var inquirer = require("inquirer");

// Word list, random word selected from list
var wordChoices = ["SiFi_Movies", "SiFi_Movies", "SiFi_Movies", "SiFi_Movies", "SiFi_Movies", "SiFi_Movies"];
var wordIndex = Math.floor(Math.random() * wordChoices.length);

var newWord = new Word(wordChoices[wordIndex]);
var maxGuesses = 10;