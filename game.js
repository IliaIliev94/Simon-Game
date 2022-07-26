let level = 0;
let gamePattern = [];
let userClickedPattern = [];
const buttonColors = ["red", "green", "blue", "yellow"];

$(document).keydown(function () {
    if (level !== 0) {
        return;
    }
    nextSequence();
});

$(".btn").click(function () {
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    playSound(userChosenColour);

    checkAnswer(userClickedPattern);
});

function nextSequence() {
    userClickedPattern = [];
    level++;

    $("#level-title").text("Level " + level);
    const randomNumber = newSequence();

    const randomChosenColour = buttonColors[randomNumber];

    const button = $("#" + randomChosenColour);
    playSound(randomChosenColour);

    button.fadeOut(100, "swing", function () {
        button.fadeIn(100);
    });

    gamePattern.push(randomChosenColour);
}

function checkAnswer(userClickedPattern) {
    let isCorrect = isAnswerCorrect(userClickedPattern);
    if (!isCorrect) {
        gameOver();
        startOver();
    } else if (userClickedPattern.length === gamePattern.length) {
        setTimeout(nextSequence, 400);
    }
}

function isAnswerCorrect(userClickedPattern) {
    const lastElement = userClickedPattern.length - 1;
    return userClickedPattern[lastElement] === gamePattern[lastElement];
}

function gameOver() {
    const body = $("body");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    body.addClass("game-over");
    setTimeout(() => body.removeClass("game-over"), 100);
    playSound("wrong");
}

function animatePress(currentColour) {
    const button = $("#" + currentColour);
    button.addClass("pressed");
    setTimeout(() => button.removeClass("pressed"), 100);
}

function playSound(name) {
    let audio = new Audio(`./sounds/${name}.mp3`);
    audio.play();
}

function newSequence() {
    return Math.floor(Math.random() * 4);
}

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
}
