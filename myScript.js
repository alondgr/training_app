let workTimer = 30000;
let remainingTime = workTimer;
let initRound = 0;
let totalRounds = 5;
let initRest = 30000;
let restTimer = initRest;

let resetButton = document.getElementById("resetBtn");

resetButton.addEventListener("click", function () {
    location.reload();
});

document.getElementById("tmr").innerHTML = "0" + formatTime(remainingTime);
document.getElementById("rounds").innerHTML = initRound;
document.getElementById("rounds_total").innerHTML = totalRounds;
document.getElementById("rest_display").innerHTML = "0" + formatTime(restTimer);
document.getElementById("tmr_rest").innerHTML = "0" + formatTime(initRest);

let inc_btn = document.getElementById("inc_btn");
let dec_btn = document.getElementById("dec_btn");
let inc_btn_rounds = document.getElementById("inc_round_btn");
let dec_btn_rounds = document.getElementById("dec_round_btn");
let inc_btn_rest = document.getElementById("inc_rest_btn");
let dec_btn_rest = document.getElementById("dec_rest_btn");
//------------------------BUTTONS-------------------------------------------------------------
inc_btn.addEventListener("click", () => {
    remainingTime += 1000;
    document.getElementById("tmr").innerHTML = "0" + formatTime(remainingTime);
    workTimer = remainingTime;
    console.log(workTimer);
});

dec_btn.addEventListener("click", () => {
    remainingTime -= 1000;
    workTimer = remainingTime;
    if (remainingTime <= 0) {
        remainingTime = 0;
    }
    document.getElementById("tmr").innerHTML = "0" + formatTime(remainingTime);
});

inc_btn_rounds.addEventListener("click", () => {
    totalRounds++;
    document.getElementById("rounds_total").innerHTML = totalRounds;
});

dec_btn_rounds.addEventListener("click", () => {
    totalRounds--;
    document.getElementById("rounds_total").innerHTML = totalRounds;
    if (totalRounds <= 1) {
        totalRounds = 1;
        document.getElementById("rounds_total").innerHTML = totalRounds;
    }
});

inc_btn_rest.addEventListener("click", () => {
    restTimer += 1000;
    initRest = restTimer;
    document.getElementById("rest_display").innerHTML = "0" + formatTime(restTimer);
});

dec_btn_rest.addEventListener("click", () => {
    restTimer -= 1000;
    initRest = restTimer;
    document.getElementById("rest_display").innerHTML = "0" + formatTime(restTimer);
    if (restTimer < 1000) {
        restTimer = 1;
        document.getElementById("rest_display").innerHTML = "0" + formatTime(restTimer);
    }
});

const startButton = document.getElementById("strtBtn");

//--------^^^^^^^^^^^^^^-----BUTTONS----^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^--------------------------

function formatTime(remainingMilliseconds) {
    let minutes = Math.floor(remainingMilliseconds / 60000);
    let seconds = Math.floor((remainingMilliseconds % 60000) / 1000);

    seconds = seconds < 10 ? "0" + seconds : seconds;

    return minutes + ":" + seconds;
}

//1
startButton.addEventListener("click", startTimer);
function startTimer() {
    var audio = new Audio('https://github.com/alondgr/training_app/raw/main/start.mp3');
    audio.play() || document.getElementById("buzzer").play();

    let preTimer = 3000;
    if (startButton.textContent === "START") {
        startButton.textContent = "STOP";
    }
    setTimeout(() => {
        workoutTimer();
    }, preTimer)
}

//2
function workoutTimer() {
    console.log("remaingn time" + remainingTime);
    intervalId = setInterval(() => {
        remainingTime -= 1000;
        if (remainingTime < 0) {
            remainingTime = workTimer;
            clearInterval(intervalId);
            // document.getElementById("endSound").play();
            var audio4 = new Audio('https://github.com/alondgr/training_app/raw/main/rest_word.mp3');
            audio4.play() || document.getElementById("rest_word").play();
            console.log("rest word");
            rest();
        }
        if (remainingTime === 3000) {
            document.getElementById("three").play();
        }
        if (remainingTime === 2000) {
            document.getElementById("two").play();
        }
        if (remainingTime === 1000) {
            document.getElementById("one").play();
        }
        document.getElementById("tmr").innerHTML = "0" + formatTime(remainingTime);
    }, 1000);
    var audio2 = new Audio('https://github.com/alondgr/training_app/raw/main/fight_lean.mp3');
    audio2.play() || document.getElementById("fight").play();
    console.log("rest word");
    rest();
}

//3
function rest() {
    document.getElementById("tmr").style.display = "none";
    document.getElementById("tmr_rest").style.display = "block";
    document.getElementById("tmr_rest").innerHTML = "Rest " + formatTime(restTimer);
    var audio3 = new Audio('https://github.com/alondgr/training_app/raw/main/three_lean.mp3');

    let restIntervalId = setInterval(() => {
        restTimer -= 1000;
        if (restTimer < 0) {
            remainingTime = workTimer;
            restTimer = 0;
            clearInterval(restIntervalId);
            workoutTimer();
            restTimer = initRest;
            document.getElementById("tmr_rest").style.display = "none";
            console.log("workout called");
            document.getElementById("tmr").style.display = "block";
            initRound++;
            document.getElementById("rounds").innerHTML = initRound;
        }
        if (restTimer === 3000) {
            document.getElementById("three").play() || audio3.play();
        }
        if (restTimer === 2000) {
            document.getElementById("two").play();
        }
        if (restTimer === 1000) {
            document.getElementById("one").play();
        }
        if (initRound === totalRounds) {
            clearInterval(intervalId);
            startButton.textContent = "START";
            console.log(startButton);
        }
        document.getElementById("tmr_rest").innerHTML = "Rest " + formatTime(restTimer);
    }, 1000);
}

