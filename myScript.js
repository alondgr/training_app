let remainingTime = 4000;
document.getElementById("tmr").innerHTML = "0" + formatTime(remainingTime);
let initRound = 0;
let totalRounds = 3;

document.getElementById("rounds_total").innerHTML = totalRounds;
document.getElementById("rounds").innerHTML = initRound;

let inc_btn = document.getElementById("inc_btn");
let dec_btn = document.getElementById("dec_btn");
let inc_btn_rounds = document.getElementById("inc_round_btn");
let dec_btn_rounds = document.getElementById("dec_round_btn");
//------------------------BUTTONS-------------------------------------------------------------
inc_btn.addEventListener("click", () => {
    remainingTime += 1000;
    document.getElementById("tmr").innerHTML = "0" + formatTime(remainingTime);
});

dec_btn.addEventListener("click", () => {
    remainingTime -= 1000;
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

const startButton = document.getElementById("strtBtn");

//--------^^^^^^^^^^^^^^-----BUTTONS----^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^--------------------------

function formatTime(remainingMilliseconds) {
    let minutes = Math.floor(remainingMilliseconds / 60000);
    let seconds = Math.floor((remainingMilliseconds % 60000) / 1000);

    seconds = seconds < 10 ? "0" + seconds : seconds;

    return minutes + ":" + seconds;
}

let intervalId;

startButton.addEventListener("click", () => {
    if (startButton.textContent === "START") {
        startButton.textContent = "STOP";

        intervalId = setInterval(() => {
            remainingTime -= 1000;

            if (remainingTime <= 0) {
                clearInterval(intervalId);
                initRound++;
                document.getElementById("rounds").innerHTML = initRound;
                rest();
            }
            document.getElementById("tmr").innerHTML = "0" + formatTime(remainingTime);
        }, 1000);
    } else if (startButton.textContent === "STOP") {

        clearInterval(intervalId);
    }
});

function rest() {
    let restDuration = 4000;
    let restIntervalId = setInterval(() => {
        restDuration -= 1000;
        if (restDuration <= 0) {
            clearInterval(restIntervalId);
            remainingTime = 4000;

            intervalId = setInterval(() => {
                remainingTime -= 1000;
                if (remainingTime <= 0) {
                    clearInterval(intervalId);
                    initRound++;
                    document.getElementById("rounds").innerHTML = initRound;
                    rest();
                }
                document.getElementById("tmr").innerHTML = "0" + formatTime(remainingTime);

            }, 1000);
        }
        if (initRound === totalRounds) {
            clearInterval(intervalId);
        }
        document.getElementById("tmr").innerHTML = "Rest " + formatTime(restDuration);
    }, 1000);
}