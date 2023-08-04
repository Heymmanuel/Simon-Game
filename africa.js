alert("Are you working Africa?");
//new array called  the userClickedPattern
const userClickedPattern = [];

// new array called the game pattern and push randomChosenColor innit.
const gamePattern = [];
// array that stores my color values.
const buttonColor = ["red", "blue", "green", "yellow"]
//new variable called level
var level = 0;
var started = false;

$(document).keypress(function(){
  if(!started){
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
})



// using jquery to detect when any of my buttons are clicked 
$(".btn").click(function(){
  //getting the id of the button that's clicked.
  var userChosenColor = $(this).attr
  ("id");
  userClickedPattern.push(userChosenColor);
  animatePress(userChosenColor);
  playSound(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
    
})



// random number between 0 and 3
function nextSequence(){
  userClickedPattern.length = 0;
  level++;
  $("#level-title").text("Level " + level);
  
  var randomIndex = Math.floor(Math.random() * 4);
  var randomNumber = randomIndex;
  var randomChosenColor = buttonColor[randomNumber];
  gamePattern.push(randomChosenColor);

  // ussing jquery to animated the randomChoosenColor.
$("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100)
playSound(randomChosenColor);

}

// audio path
function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3")
  audio.play();
}

function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed");
  setTimeout(function(){
    $("#" + currentColor).removeClass("pressed")
  }, 100);
} 

function checkAnswer(currentLevel){
  
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern.length = 0;
  userClickedPattern.length = 0;
  started = false;
  $("#level-title").text("Game Over, Press Any Key to Restart");

  // Show the game-over animation by adding a class
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
}