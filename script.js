// set the situation once the page loads for the first time
// we are not playing and the score doesn't have a value
var playing = false;
var score;
// store the output of the countdown function
var action;
// variable for the time number in html
var timeRemaining;
//declare variables that will store a product of two numbers
var correctAnswer;


// if we click on the start/reset button
document.getElementById("start-reset").onclick = 
    function(){
    //if we are playing
    if(playing == true){
        location.reload(); // reload the page 
        
    } else { // if we are not playing
        
        // change mode to playing
        playing = true;
        
        // set score to 0 and add to HTML
        score = 0; 
        document.getElementById("scoreValue").innerHTML = score;
        
        // show countdown box
        show("time-remaining");
        // give our timeRemaining variable 60 seconds
        timeRemaining = 60;
        document.getElementById("timeRemainingValue").innerHTML = timeRemaining;
        
        // hide the game over box
        hide("gameOver");
        
        // change start button to reset
        document.getElementById("start-reset").innerHTML = "Reset Game";
        
        // start countdown
        startCountDown();
        
        // generate a new Q and multiple answers
        generateQA();
        
    }
    
}

// clicking on an answer box
for(i=1; 1<5;i++) {
    document.getElementById("box" + i).onclick = function() {
    // check if we are playing
    if(playing == true){
        // check if answer is correct (this refers to the parent)
        if(this.innerHTML == correctAnswer){ // correct
            // increase score by 1
            score++;
            // update the html element with new value
            document.getElementById("scoreValue").innerHTML = score;
            // hide wrong answer box to avoid two boxes appearing at the same time
            hide("wrong");
            // show the correct box for 1 second
            show("correct");
            setTimeout(function(){
                // hide the box after 1 second
                hide(correct);
            }, 1000);
            
            // generate new Q and A
            generateQA();
            
            
        } else { // wrong answer
            hide("correct");
            show("wrong");
            setTimeout(function(){
                hide("wrong");
            }, 1000);
            score--;
            
        }
     }
    
  }
    
    
    
}


// if click on answer box, are we playing?
// if yes - is the answer correct? increase the score by 1, show correct box for 1 sec, generate a new question
// is the answer wrong? show try again box.


// FUNCTIONS

// define the startCountDown function
function startCountDown(){
    action = setInterval(function(){
        timeRemaining -= 1;
        document.getElementById("timeRemainingValue").innerHTML = timeRemaining;
        if(timeRemaining == 0) { // game over
            stopCountdown(); // a function for clearing the interval
            // show the game over div
            show("gameOver");
            document.getElementById("gameOver").innerHTML = 
                "<p>Game Over!</p>" + "<p>Your score is: " + score + ". </p>";
            // make time counter to dissapear
            hide("time-remaining");
            // hide correct and wrong popups
            hide("correct");
            hide("wrong");
            
            // change our mode to non-playing
            playing = false;
            // change button to display start game
            document.getElementById("start-reset").innerHTML = "Start Game";
        }
    }, 1000)
    // every second reduce by 1
    
    
}

// stop the timer
function stopCountdown() {
    clearInterval(action);
}

// function to reuse the code for hiding an element
function hide(id){
    document.getElementById(id).style.display = "none";
    
}

// function to reuse the code for showing an element
function show(id){
    document.getElementById(id).style.display = "block";
    
}

// generate Q&A function
function generateQA(){
    // the code below results in numbers b/w 1 and 10 (by adding 1) since we do not want to include 0, we are not multiplying by 10
    var x = 1 + Math.round(9*Math.random());
    var y = 1 + Math.round(9*Math.random());
    correctAnswer = x*y;
    document.getElementById("question").innerHTML = 
        x + "x" + y;
    
    // assigning the correct answer to a random position out of the four boxes
    var correctPosition = 1 + Math.round(3*Math.random());
    document.getElementById("box" + correctPosition).innerHTML = correctAnswer;
    
    // fill other boxes with wrong answers
    var answers = [correctAnswer];
    
    for(i = 1; i < 5; i++){
        if(i != correctPosition){
            // products of two random numbers
            var wrongAnswer;
            // since the var wrongAnswer is declared but undefined, a while loop will show all wrong numbers as undefined since it is trying to match an undefined with a number. To fix this we need to first create a random number and then check for the comparison. This is why we use a do...while loop.
            do{
            wrongAnswer = (1+Math.round(9*Math.random())) * (1+Math.round(9*Math.random()));
            } while(answers.indexOf(wrongAnswer)>-1)
            
// The code below only checks if the wrong answer is the same as the correct answer, we need to also check if a wrong answer is the same as any other wrong answer
//            } while(wrongAnswer == correctAnswer)
// to do this, we need to create an array, put all answers into it and then check whether the index of our wrong answer is greater than -1 (this means that a number like that already exists in the array with an assigned index)
            
            document.getElementById("box"+i).innerHTML = wrongAnswer;
            answers.push(wrongAnswer);
        }
        
    }
    
    
    
    
    
}

























