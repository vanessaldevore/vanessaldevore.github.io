//Event Listeners
document.querySelector("#guessBtn").addEventListener("click", checkGuess);
document.querySelector("#resetBtn").addEventListener("click", initializeGame);

//Global variables
let randomNumber;
let attempts = 0;
let wins = 0;
let losses = 0;

initializeGame();

function initializeGame() {
   randomNumber = Math.floor(Math.random() * 99) + 1;
   console.log("randomNumber: " + randomNumber);
   attempts = 0;

   //hiding the Reset button
   document.querySelector("#resetBtn").style.display = "none";
  
   //showing guess button
   document.querySelector("#guessBtn").style.display = "inline";

   let playerGuess = document.querySelector("#playerGuess");
   playerGuess.focus(); //adding focus to a textbox
   playerGuess.value = ""; //clearing the textbox

   let feedback = document.querySelector("#feedback");
    feedback.textContent = ""; //clearinh feedback

    //clearing previous guesses and attempys
    document.querySelector("#guesses").textContent = "";
    document.querySelector("#attempts").textContent = attempts;
}

function checkGuess() {
    let feedback = document.querySelector("#feedback");
    feedback.textContent = "";
    let guess = document.querySelector("#playerGuess").value;
    console.log("Player guess: " + guess);
    if (guess < 1 || guess > 99) {
        feedback.textContent = "Enter a number between 1 and 99";
        feedback.style.color = "yellow";
        return;
    }
    attempts++;
    console.log("Attempts: " + attempts);
    feedback.style.color = "lightblue";
    if (guess == randomNumber) {
        feedback.textContent = "You guessed it! You Won!";
        feedback.style.color = "lightgreen";
        wins++;
        document.querySelector("#wins").textContent = wins;
        gameOver();
    } else {
        document.querySelector("#guesses").textContent += guess + " ";
        document.querySelector("#attempts").textContent = attempts;
        if (attempts == 7) {
            feedback.textContent = "Sorry, you lost!";
            feedback.style.color = "lightblue";
            losses++;
            document.querySelector("#losses").textContent = losses;
            gameOver();
        } else if (guess > randomNumber) {
            feedback.textContent = "Guess was high";
        } else {
            feedback.textContent = "Guess was low";
        }
    }
}

function gameOver() {
    let guessBtn = document.querySelector("#guessBtn");
    let resetBtn = document.querySelector("#resetBtn");
    guessBtn.style.display = "none";
    resetBtn.style.display = "inline";
}