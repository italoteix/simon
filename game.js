
// Variables

var gamePattern = [];

var buttomColours = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];

var level = 0;

var started = false;

// Clicked Function

$(".btn").click(function(event) {

  var userChosenColour = event.target.getAttribute("id");
  // console.log(userChosenColour);

  userClickedPattern.push(userChosenColour);
  // console.log(userClickedPattern);

  playSound(userChosenColour);

  animetePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);

});

// Main Function

function nextSequence() {

  userClickedPattern = [];

  level++;

  $("h1").text("Level " + level);

  var randomNumber = Math.floor(Math.random()*4);
  console.log(randomNumber);

  var randomChosenColour = buttomColours[randomNumber];
  console.log(randomChosenColour);

  gamePattern.push(randomChosenColour);
  console.log(gamePattern);

  $("#" + randomChosenColour).fadeTo(100, 0.3, function() {$(this).fadeTo(500, 1.0);});

  playSound(randomChosenColour);

  animetePress(randomChosenColour);

}

// Play Sound

function playSound(name) {
  var audio = new Audio("sounds/" + name +".mp3");
  audio.play();
}

// Blink

function animetePress(currentColour) {
  $("#"+currentColour).addClass('pressed').delay(100).queue(function(next){
         $(this).removeClass('pressed');
         next();
  });
}

// Press to Start

$(document).keypress(function() {
  if (!started) {
    nextSequence();
    started= true;
  }
} );

// Checking Answer

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(nextSequence, 1000);
    }

  } else {
      console.log("wrong");

      playSound("wrong");

      $("body").addClass("game-over").delay(200).queue(function(next) {
        $(this).removeClass("game-over");
        next();
      });

      $("h1").text("Game Over, Press Any Key to Restart");

      startOver();
  }
}

// Restart

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
