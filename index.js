let questions = [
    "1. Which animal is known as the 'Ship of the Desert ?",
    "2. How many days are there in a week?",
    "3. How many hours are there in a day?",
    "4. How many letters are there in the English alphabet?",
    "5. Rainbow consists of how many colors?"
];

let options = [
    ["A. camel", "B. monkey", "C. anaconda", "D. tiger"],
    ["A. 25", "B. 30", "C. 8", "D. 7"],
    ["A. 10", "B. 20", "C. 24", "D. 25"],
    ["A. 20", "B. 22", "C. 24", "D. 26"],
    ["A. 2", "B. 7", "C. 3", "D. 4"]
];

let correctAnswers = [0, 3, 2, 3, 1]; // Indices of correct options for each question
let initial = 0;
let score = 0;

let container = document.getElementById("container");
let questions_display = document.getElementById("questions_display");
let options_list = document.getElementById("options_list");
let next = document.getElementById("next");
let previous = document.getElementById("previous");
let clock = document.getElementById("clock");

// Function to update the question and options
function updateQuestion(index) {
    questions_display.innerHTML = questions[index];
    options_list.innerHTML = ""; // Clear existing options

    // Dynamically create checkboxes for each option
    options[index].forEach((option, i) => {
        let label = document.createElement("label");
        let checkbox = document.createElement("input");
        checkbox.type = "radio"; // Use radio buttons for single selection
        checkbox.name = "option";
        checkbox.value = i;

        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(option));
        options_list.appendChild(label);
        options_list.appendChild(document.createElement("br"));
    });

    manageButtonVisibility();
}

// Function to check the selected answer
function checkAnswer() {
    let selected = document.querySelector('input[name="option"]:checked');
    if (selected && parseInt(selected.value) === correctAnswers[initial]) {
        score++; // Increase score for correct answer
    }
}

function checkAnswer1() {
    let selected = document.querySelector('input[name="option"]:checked');
    if (selected && parseInt(selected.value) === correctAnswers[initial]) {
        score--; // Increase score for correct answer
    }
}
// Function to manage button visibility
function manageButtonVisibility() {
    previous.style.display = initial === 0 ? "none" : "block";
    next.innerHTML = initial === questions.length - 1 ? "Finish Quiz" : "Next";
}

// Initial setup
updateQuestion(initial);

// Event listener for the 'Next' button
next.addEventListener("click", () => {
    checkAnswer(); // Check the answer before moving to the next question
    if (initial < questions.length - 1) {
        initial++;
        updateQuestion(initial);
    } 
   
    else {
        clearInterval(timer)
        alert("please wait  we redirecting to score card")
        setTimeout(()=>{
            // Quiz completed, show final score
            container.innerHTML = `
            <h1>Quiz Completed!</h1>
            <p id="score">Your Score: ${score} / ${questions.length}</p>
            <img src="./smiley.jpeg" alt="image not found" >
        `;
        clearInterval(timer); // Stop the timer
        },3000)
        
    }
    
});

// Event listener for the 'Previous' button
previous.addEventListener("click", () => {
    checkAnswer1()
    if (initial > 0) {
        initial--;
        updateQuestion(initial);
    }
});

// Timer functionality  
let time = 120; // Total time in seconds
let timer = setInterval(() => {
    if (time >= 0) {
        let minutes = Math.floor(time / 60); // Calculate minutes
        let seconds = time % 60; // Calculate remaining seconds
        clock.innerHTML = `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`; // Format as MM:SS
        time--;
    } else {
        clearInterval(timer); // Stop the timer when time runs out
        alert("please wait  we redirecting to score card")
        setTimeout(()=>{
            container.innerHTML = `
            <h1>Time's up!</h1>
            <p>Your Score: ${score} / ${questions.length}</p>
            <img src="./smiley.jpeg" alt="image not found" >
            `;
        },3000)
        
        let clock_img = document.getElementById("clock_img");
        clock_img.setAttribute("src","./bomb.jpg");
    }
}, 1000);
