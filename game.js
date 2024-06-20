var gamePattern = [];
var userClickedPattern = [];
var level = 0;
const $title = $("#level-title")[0];

//adding event listener to all button
for (var i = 0; i < $(".btn").length; i++) {
    $(".btn")[i].addEventListener("click", function () {
        var userChosenColour = this.id;
        userClickedPattern.push(userChosenColour);
        checkAnswer(userClickedPattern.length - 1);
        playSound(userChosenColour);
        animatePress(userChosenColour);

        //change h1
    });
}

//allow user to start game
//to-do
document.addEventListener("keypress", function () {
    if (level == 0) {
        setTimeout(function () {
            nextSequence(); 
        }, 1000);
        $title.innerHTML = "Level " + (++level);
    }
});

//generate a random color pattern once
function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var buttonColours = ["red", "blue", "green", "yellow"];
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    playSound(randomChosenColour);
    animatePress(randomChosenColour);
}

function playSound(name) {
    new Audio("sounds/" + name + ".mp3").play();
}

function animatePress(name) {
    $("#" + name).addClass("pressed");

    setTimeout(function () {
        $("#" + name).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] !== userClickedPattern[currentLevel]) {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        $title.innerHTML = "Game Over, Press Any Key to Restart";
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    } else if (currentLevel === gamePattern.length - 1) {
        console.log("Success");
        userClickedPattern.length = 0;
        $title.innerHTML = "Level " + (++level);
        setTimeout(function () {
            nextSequence(); 
        }, 1000);
    }
}

function startOver() {
    level = 0;
    gamePattern.length = 0;
    userClickedPattern.length = 0;
}