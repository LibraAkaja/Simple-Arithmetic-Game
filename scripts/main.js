/*
    Option Generation :
    Generally, what a person thinks while playing game such as this, he/she adds the last digits of given two numbers and quickly match its sum to
    the option with the same last digit.
    So, here I have made options in such a way that this thinking may be useful sometimes, but not everytime.
*/

/* 
    Number generation format for multiplication :
    a. square of same numbers starting from 10 to 20
    b. multiples of 5 upto 100 square
    c. multiples of 11 upto 55 square
    d. table of 12 to 20 starting from 5 to 10
    e. table of 20 to 100 greater than 3 and less than = 5
*/

"use strict";

let numberOfgameSets = 0;       //To count the number of sets played
let gameSetDecadeCounter = 0;   //To count the number of decades of game set played/playing
let randomGameSet = null;       //To set on which game set to award an extra life

let lives = 5;      //Total number of lives

let score = 0;      //Initial Score

let pSum = 0;       //Pre Calculated Sum initially
let pDiff = 0;      //Pre Calculated Difference initially
let pPro = 0;       //Pre Calculated Product initially
let pQuo = 0        //Pre Calculated Quotient initially

/* Timebar parameters */
let totalTime = 5000;               // Time per set of the game
let timeRemaining = totalTime;      // To track remaining time
let intervalTime = 100;             // Interval for updating the time bar
let intervalId = null;              // To store interval ID to manage the timer
const timeBar = document.getElementById("timeBar");

//A proper random number generator function
function getRandomInt(min,max,exclude){ 
    let randNum;
    do{
        randNum = Math.floor(Math.random() * (max-min+1)) + min; 
    }while(randNum === exclude);    //Exclude certain number from a range of numbers
    return randNum;
}

//Function to get a random operator
function getRandomOperator() {
    const operators  = ['+','-','*','/']; 
    document.querySelector('#operators').innerHTML = operators[getRandomInt(0,3)]; 
}

//Set random numbers and get their precalculated answer for comparison later
function setRandomNumbers() {
    return new Promise((resolve) => setTimeout(() => {
        const n1 = document.getElementById("n1");
        const n2 = document.getElementById("n2");

        const op = document.querySelector('#operators').innerHTML;

        if(op === '+') {
            n1.innerHTML = getRandomInt(10,100);
            n2.innerHTML = getRandomInt(10,100);
            pSum = getSum(n1,n2);                   //Get the precalculated sum
        }
        else if(op === '-') {
            n1.innerHTML = getRandomInt(10,100);
            n2.innerHTML = getRandomInt(10,100);
            pDiff = getDiff(n1,n2);                 //Get the precalculated difference
        }
        else if(op === '*') {                       
            const waysONumGen = ['a','b','c','d','e'];      //Number generation format for multiplication
            let randomWay = waysONumGen[getRandomInt(0,4)];
            if(randomWay === 'a') {
                totalTime = 6000;                       //Setting total time to answer this type of numbers
                n1.innerHTML = getRandomInt(12,19);
                n2.innerHTML = n1.innerHTML;
            }
            else if(randomWay === 'b') {
                totalTime = 7000;
                n1.innerHTML = 5 * getRandomInt(3,19);
                if(n1.innerHTML % 10 === 0) {
                    n1.innerHTML -= 5;
                }
                n2.innerHTML = n1.innerHTML;
            }
            else if(randomWay === 'c') {
                totalTime = 5000;
                n1.innerHTML = 11 * getRandomInt(2,5);    
                n2.innerHTML = n1.innerHTML;
            }
            else if(randomWay === 'd') {
                totalTime = 10000;
                n1.innerHTML = getRandomInt(12,19);
                n2.innerHTML = getRandomInt(5,9);
            } 
            else if(randomWay === 'e') {
                totalTime = 8000;
                n1.innerHTML = getRandomInt(21,99);
                n2.innerHTML = getRandomInt(3,5);
            }
            pPro = getPro(n1,n2);                       //Get the precalculated product
        }
        else if(op === '/') {
            n1.innerHTML = getRandomInt(10,50) * 10 + getRandomInt(-5,5);
            n2.innerHTML = getRandomInt(11,50);
            pQuo = getQuo(n1,n2);                       //Get the precalculated quotient
        }
        
        resolve();
    },1000));
}

//To return the pre-calculated sum of the random numbers
function getSum(a,b) {
    return parseInt(a.innerHTML) + parseInt(b.innerHTML);
}

//To return the pre-calculated difference of the random numbers
function getDiff(a,b) {
    return parseInt(a.innerHTML) - parseInt(b.innerHTML);
}

//To return the pre-calculated product of the random numbers
function getPro(a,b) {
    return parseInt(a.innerHTML) * parseInt(b.innerHTML);
}

//To return the pre-calculated quotient of the random numbers
function getQuo(a,b) {
    return Math.floor(parseInt(a.innerHTML) / parseInt(b.innerHTML));
}

// Option generation function
function generateOptions() {
    return new Promise((resolve) => setTimeout(() => {
        const o1 = document.getElementById("o1");
        const o2 = document.getElementById("o2");
        const o3 = document.getElementById("o3");
        const o4 = document.getElementById("o4");

        const op = document.querySelector('#operators').innerHTML;

        //Logic setting for options
        if(op === '+') {
            o1.innerHTML = pSum;                                                      
            o2.innerHTML = pSum + getRandomInt(-3,3,0) * 10 - getRandomInt(-1,0);     
            o3.innerHTML = pSum + getRandomInt(-3,3,0) * 10 - getRandomInt(-1,1);     
            o4.innerHTML = pSum + getRandomInt(-3,3,0) * 10 - getRandomInt(0,1);      
        }
        else if(op === '-') {
            o1.innerHTML = pDiff + getRandomInt(-3,3,0) * 10 - getRandomInt(-1,0);
            o2.innerHTML = pDiff;
            o3.innerHTML = pDiff + getRandomInt(-3,3,0) * 10 + getRandomInt(-1,1);
            o4.innerHTML = pDiff + getRandomInt(-3,3,0) * 10 - getRandomInt(0,1);
        }
        else if(op === '*') {    
            o1.innerHTML = pPro + getRandomInt(-3,3,0) * 10;
            o2.innerHTML = pPro + getRandomInt(-3,3,0) * 10 + getRandomInt(-1,1,0);
            o3.innerHTML = pPro;
            o4.innerHTML = pPro + getRandomInt(-3,3,0) * 10 - getRandomInt(-1,1,0);
        }
        else if(op === '/') {
            o1.innerHTML = pQuo + getRandomInt(-3,3,0) * 10;
            o2.innerHTML = pQuo + getRandomInt(-3,3,0) * 10 + getRandomInt(-1,1,0);
            o3.innerHTML = pQuo + getRandomInt(-3,3,0) * 10 - getRandomInt(-1,1,0);
            o4.innerHTML = pQuo;
        }
        
        /*
            Now that we have the options, we must shuffle out the logic settings for each options. 
            Not doing so will make all the answers stay in same place forever. That will no longer be a game 
        */

        // Extracting options values from each option divs 
        const options = Array.from(document.querySelectorAll(".smallCircleForOption"));
        const values = options.map(option => option.innerHTML);
        
        // Using the Fisher-Yates algorithm to swap the values in options
        for(let i = values.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i+1));
            [values[i],values[j]] = [values[j],values[i]];
        }

        //Assigning the shuffled values back to the divs
        options.forEach((option,index) => {
            option.innerHTML = values[index];
        });

        resolve();
    },1500));
}

//Score updater function
function updateScore() {
    score += 150 + timeRemaining / 4;     // Updating the score for each correct choice
}

//Function to check lives count
function checkLivesCount() {
    if(lives === 0) {
        pauseTimer();       //Pauses the timer
        setTimeout(() => {
            sessionStorage.setItem('finalScore',score);
            window.location.href = 'scoreboard.html';
        },2000);
    }
    else
    {
        resetTimer();
        runGame();
    }
}

//Executes after userActivityHandler() is invoked. This function is to handle the various cases that may happen when user clicks an option
function setThings(event) {  
    pauseTimer();                                               // Pause the timer immediately when user clicks an option                            
    const clickedAns = parseInt(event.target.innerHTML);        // Put the number clicked by user in clickedAns
    const op = document.querySelector('#operators').innerHTML;  
    if(op === '+') {
        if(clickedAns === pSum) {
            onCorrectAnswer(event);
        }
        else {
            onIncorrectAnswer(event);
        }
    }
    else if(op === '-') {
        if(clickedAns === pDiff) {
            onCorrectAnswer(event);
        }
        else {
            onIncorrectAnswer(event);
        }
    }
    else if(op === '*') {
        if(clickedAns === pPro) {
            onCorrectAnswer(event);
        }
        else {
            onIncorrectAnswer(event);
        }
    }
    else if(op === '/') {
        if(clickedAns === pQuo) {
            onCorrectAnswer(event);
        }
        else {
            onIncorrectAnswer(event);
        }
    }
}

//One life down animation
function lifeDownAnimation() {
    if(lives === 4) {
        document.querySelector("#l1").src = "../assets/images/lifeDown.svg";
    }
    else if(lives === 3) {
        document.querySelector("#l2").src = "../assets/images/lifeDown.svg";
    }
    else if(lives === 2) {
        document.querySelector("#l3").src = "../assets/images/lifeDown.svg";
    }
    else if(lives === 1) {
        document.querySelector("#l4").src = "../assets/images/lifeDown.svg";
    }
    else if(lives === 0) {
        document.querySelector("#l5").src = "../assets/images/lifeDown.svg";
    }
}

//Function to check the no. of set for extra life
function checkGameSet(event) {
    if(numberOfgameSets === randomGameSet) {
        event.target.style.background = "url('../assets/images/extraLife.svg') no-repeat center center";
        event.target.style.backgroundSize = "contain";
        lives ++;
        if(lives === 5) {
            document.querySelector("#l1").src = "../assets/images/life.svg";
        }
        else if(lives === 4) {
            document.querySelector("#l2").src = "../assets/images/life.svg";
        }
        else if(lives === 3) {
            document.querySelector("#l3").src = "../assets/images/life.svg";
        }
        else if(lives === 2) {
            document.querySelector("#l4").src = "../assets/images/life.svg";
        }
    }
    else {
        event.target.style.background = "url('../assets/images/correct.svg') no-repeat center center";   
        event.target.style.backgroundSize = "cover";
    }
}

//When the answer is correct
function onCorrectAnswer(event) {    
    checkGameSet(event);    //Check the no. of game set to award an extra life if eligible
    updateScore();          // Update the score
    resetTimer();           // Reset the timer
    runGame();              // Run the next set of game
}

//When the answer is incorrect
function onIncorrectAnswer(event) {
    event.target.style.background = "url('../assets/images/incorrect.svg') no-repeat center center";   
    event.target.style.backgroundSize = "cover";
    lives--;                                        //Reduce one life
    lifeDownAnimation();
    checkLivesCount();                              //Check lives count
}

//Function handling every action from the user
function userActivityHandler() {
    //Adding the same event to all the option divs 
    document.querySelector("#o1").addEventListener("click", setThings);
    document.querySelector("#o2").addEventListener("click", setThings);
    document.querySelector("#o3").addEventListener("click", setThings);
    document.querySelector("#o4").addEventListener("click", setThings);
}

//Function to start the timer
function startTimer() {
    timeRemaining = totalTime;             //Reset remaining time to 100 percent
    timeBar.style.width = "100%";         //Reset the timebar width to 100 percent
    if (intervalId) clearInterval(intervalId);                  //To clear any previous interval to avoid overlapping timer
    intervalId = setInterval(() => {
        timeRemaining -= intervalTime;                                  //Decrease remaining time by interval time
        const widthPercentage = (timeRemaining / totalTime) * 100;        //Calculating the varying width
        timeBar.style.width = `${widthPercentage}%`;                 //Updating the width of timebar
        if (timeRemaining <= 0) {                  //When the time runs out
            clearInterval(intervalId);      //Stop the interval
            timeBar.style.width = "0%";     //Set the timebar to empty
            onTimeEnd();                    //Call this function for timeup action
        }
    }, intervalTime);
}

//Function to reset the timer
function resetTimer() {
    clearInterval(intervalId);
    timeRemaining = totalTime;
    timeBar.style.width = "100%";    
    document.querySelector("#n1").innerHTML = null;
    document.querySelector("#n2").innerHTML = null;
    document.querySelector("#o1").innerHTML = null;
    document.querySelector("#o2").innerHTML = null;
    document.querySelector("#o3").innerHTML = null;
    document.querySelector("#o4").innerHTML = null;
    setTimeout(() => {
        document.querySelector("#o1").style.background = "none";
        document.querySelector("#o2").style.background = "none";
        document.querySelector("#o3").style.background = "none";
        document.querySelector("#o4").style.background = "none";
        document.querySelector("#o1").style.background = "rgba(112, 109, 109,0.027)";
        document.querySelector("#o2").style.background = "rgba(112, 109, 109,0.027)";
        document.querySelector("#o3").style.background = "rgba(112, 109, 109,0.027)";
        document.querySelector("#o4").style.background = "rgba(112, 109, 109,0.027)";
        document.querySelector("#o1").style.backdropFilter = "blur(2px)";
        document.querySelector("#o2").style.backdropFilter = "blur(2px)";
        document.querySelector("#o3").style.backdropFilter = "blur(2px)";
        document.querySelector("#o4").style.backdropFilter = "blur(2px)";
    },500);
}

//Function to pause the timer
function pauseTimer() {
    clearInterval(intervalId);
}

//Function to trigger what happens when the time's up
function onTimeEnd() {
    lives--;                //Reduce one life
    lifeDownAnimation();
    //Setting the z-index of various elements
    document.querySelector('#options').style.zIndex = '-1';
    document.querySelector('#n1').style.zIndex = '-1';
    document.querySelector('#n2').style.zIndex = '-1';
    document.querySelector('#operators').style.zIndex = '-1';
    document.querySelector('#equals').style.zIndex = '-1';
    document.querySelector('#timeUp').style.zIndex = '1';
    setTimeout(() => {
        document.querySelector('#options').style.zIndex = '1';
        document.querySelector('#n1').style.zIndex = '1';
        document.querySelector('#n2').style.zIndex = '1';
        document.querySelector('#operators').style.zIndex = '1';
        document.querySelector('#equals').style.zIndex = '1';
        document.querySelector('#timeUp').style.zIndex = '-1';    
        checkLivesCount();
    },2000); 
}

//Main game function
async function runGame() {
    pSum = 0;
    pDiff = 0;
    pPro = 0;
    pQuo = 0;
    totalTime = 5000;
    numberOfgameSets ++;
    if(numberOfgameSets % 10 === 0) {
        gameSetDecadeCounter ++;
        if(lives < 5) {
            bonusLife();
        }
    }
    getRandomOperator();
    await Promise.all([setRandomNumbers(),generateOptions()]);
    startTimer();
    userActivityHandler();
};

//Bonus life stage
function bonusLife() {
    randomGameSet = gameSetDecadeCounter * 10 + getRandomInt(4,10);
}

window.addEventListener("load", runGame);
window.addEventListener("load", bonusLife);

/*
Further enhancements : 
Level : Easy Medium Hard , Timing management
Responsiveness

Next version:  (Use of WebGl REQUIRED)
Multiplayer - Personal Room, Invitation URL, Player dashboard, Avatars, Name, etc
Player login Session
Player Identification
Online random (2 V 2,3 V 3, 4 V 4,5 V 5,upto 10 V 10) - Advanced
*/

