//event listeners
document.querySelector("button").addEventListener("click", gradeQuiz);

//global variables
var score = 0;
var attempts = localStorage.getItem("total_attempts");

displayQ4Choices();

//functions
function displayQ4Choices() {
    let q4ChoicesArray = ["It eats plastic waste", "It produces much of the worlds oxygen", "It makes seawater salty", "It warms the ocean"];
    q4ChoicesArray = _.shuffle(q4ChoicesArray);
    for (let i = 0; i < q4ChoicesArray.length; i++) {
        document.querySelector("#q4Choices").innerHTML += ` <input type="radio" name="q4" id= "${q4ChoicesArray[i]}" value="${q4ChoicesArray[i]}"> <label for="${q4ChoicesArray[i]}"> ${q4ChoicesArray[i]}</label>`;  
        document.querySelector("#q4Choices").innerHTML += "<br>";
    }
}        

function isFormValid(){
    let isValid = true;
    if(document.querySelector("#q1").value == "") {
        isValid = false;
        document.querySelector("#validationFdbk").innerHTML = "Question 1 is not answered";
    }
    return isValid;
}

function rightAnswer(index){
    document.querySelector(`#q${index}Feedback`).innerHTML = "Correct!";
    document.querySelector(`#q${index}Feedback`).className = "bg-success text-white";
    document.querySelector(`#markImg${index}`).innerHTML = "<img src='img/checkmark.png' alt='Checkmark'>";
    score += 20;
}

function wrongAnswer(index){
    document.querySelector(`#q${index}Feedback`).innerHTML = "Incorrect!";
    document.querySelector(`#q${index}Feedback`).className = "bg-warning text-white";
    document.querySelector(`#markImg${index}`).innerHTML = "<img src='img/xmark.png' alt='xmark'>";
}

function gradeQuiz() {
    console.log("Grading quiz...");
    document.querySelector("#validationFdbk").innerHTML = "";
    if (!isFormValid()){
        return;
    }

    //variables
    score = 0;
    let q1Response = document.querySelector("#q1").value.toLowerCase();
    let q2Response = document.querySelector("#q2").value;
    let q4Response = document.querySelector("input[name=q4]:checked").value;
    let q5Response = document.querySelector("#q5").value;

    console.log(q1Response);

    //grading question 1
    if (q1Response == "whale") {
        rightAnswer(1);
    }
    else {
        wrongAnswer(1);
    }

    //grading question 2
    if (q2Response == "Tiny living animals called polyps") {
        rightAnswer(2);
    }
    else {
        wrongAnswer(2);
    }

    //grading question 3
    if (!document.querySelector("#NevereverLand").checked && 
        document.querySelector("#BermudaTriangle").checked && 
        document.querySelector("#GreatBarrierReef").checked && 
        document.querySelector("#PacificRidge").checked) {
            rightAnswer(3);
    } else {
        wrongAnswer(3);
    }

    //grading question 4
    if (q4Response == "It produces much of the worlds oxygen") {
        rightAnswer(4);
    } else {
        wrongAnswer(4);
    }

    //grading question 5
    if (q5Response == 3) {
        rightAnswer(5);
    }
    else {
        wrongAnswer(5);
    }

    if (score >= 80) {
        document.querySelector("#congratsMessage").innerHTML = "Congratulations! You passed the quiz!";
    }   
    document.querySelector("#totalScore").innerHTML = `Total Score: ${score}`;
    document.querySelector("#totalAttempts").innerHTML = `Total Attempts: ${++attempts}`;
    localStorage.setItem("total_attempts", attempts);
}