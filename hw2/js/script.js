document.querySelector("#guessBtn").addEventListener("click", guessLetter);
document.querySelector("#newBtn").addEventListener("click", newGame);

var words = [
    { word: "starfish", hint: "Ocean Animal" },
    { word: "dolphin", hint: "Ocean Animal" },
    { word: "star", hint: "Space" },
    { word: "penguin", hint: "Arctic Animal" },
    { word: "planet", hint: "Space" }
];

var secretWord = "";
var hintText = "";
var guessedLetters = [];
var wrongLetters = [];
var wrongCount = 0;
var maxWrong = 6;

var attempts = localStorage.getItem("hangman_attempts");
if (attempts == null) {
    attempts = 0;
}
document.querySelector("#attempts").innerHTML = attempts;

newGame();

function newGame() {
    var randomIndex = Math.floor(Math.random() * words.length);
    secretWord = words[randomIndex].word.toLowerCase();
    hintText = words[randomIndex].hint;

    guessedLetters = [];
    wrongLetters = [];
    wrongCount = 0;

    document.querySelector("#hint").innerHTML = "Hint: " + hintText;
    document.querySelector("#validationFdbk").innerHTML = "";
    setMessage("New game started. Guess a letter!", "bg-info text-white");

    document.querySelector("#guessInput").value = "";

    updateWordDisplay();
    updateWrongDisplay();
    updateLives();
}

function isInputValid(letter) {
    document.querySelector("#validationFdbk").innerHTML = "";

    if (letter == "") {
        document.querySelector("#validationFdbk").innerHTML = "Please enter a letter!";
        return false;
    }

    return true;
}

function guessLetter() {
    var input = document.querySelector("#guessInput");
    var letter = input.value.toLowerCase();
    input.value = "";

    if (!isInputValid(letter)) {
        setMessage("Invalid input.", "bg-danger text-white");
        return;
    }

    if (guessedLetters.includes(letter) || wrongLetters.includes(letter)) {
        setMessage("You already tried: " + letter.toUpperCase(), "bg-warning text-white");
        return;
    }

    if (secretWord.includes(letter)) {
        guessedLetters.push(letter);
        setMessage("Correct! " + letter.toUpperCase() + " is in the word.", "bg-success text-white");
    } else {
        wrongLetters.push(letter);
        wrongCount++;
        setMessage("Incorrect! " + letter.toUpperCase() + " is NOT in the word.", "bg-warning text-white");
    }

    updateWordDisplay();
    updateWrongDisplay();
    updateLives();

    if (didPlayerWin()) {
        endGame(true);
    } else if (wrongCount >= maxWrong) {
        endGame(false);
    }
}

function updateWordDisplay() {
    var display = "";

    for (var i = 0; i < secretWord.length; i++) {
        var ch = secretWord[i];
        if (guessedLetters.includes(ch)) display += ch + " ";
        else display += "_ ";
    }

    document.querySelector("#wordDisplay").innerHTML = display.trim();
}

function updateWrongDisplay() {
    document.querySelector("#wrongLetters").innerHTML = wrongLetters.join(" ").toUpperCase();
}

function updateLives() {
    document.querySelector("#lives").innerHTML = (maxWrong - wrongCount);
}

function didPlayerWin() {
    for (var i = 0; i < secretWord.length; i++) {
        if (!guessedLetters.includes(secretWord[i])) {
        return false;
        }
    }
    return true;
}

function endGame(won) {
    attempts++;
    localStorage.setItem("hangman_attempts", attempts);
    document.querySelector("#attempts").innerHTML = attempts;

    if (won) {
        setMessage("You Win! Click New Game to play again.", "bg-success text-white");
    } else {
        setMessage("You Lost! The word was: " + secretWord.toUpperCase(), "bg-danger text-white");
    }
}

function setMessage(text, className) {
    var msg = document.querySelector("#message");
    msg.className = className;
    msg.innerHTML = text;
}