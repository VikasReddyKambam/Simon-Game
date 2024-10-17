var buttonColors = ['red', 'blue','green','yellow'];
var gamePattern = [];
var userClickedPattern = []; 
var level = 0;   
var started = false;


$('.btn').on('click', handleClick);

$(document).on('keydown', function(){
    if(started == false){
        $('#level-title').text('level '+ level);
        nextSequence();
        started = true;
    }
})

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] == userClickedPattern[currentLevel]){
        if(gamePattern.length == userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }else{
        playSound('sounds/wrong.mp3');
        $('body').addClass('game-over');
        $('#level-title').text('Game Over, Press Any Key to Restart');
        setTimeout(function(){
            $('body').removeClass('game-over');
        }, 200);
        startOver();
    }
}

function nextSequence(){
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    level += 1;
    $('#level-title').text('level '+ level);
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

function handleClick(event){
    var userChosenColor = event.target.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
}

function playSound(name){
    var audio = new Audio('sounds/'+ name +'.mp3');
    audio.play();
}

function animatePress(currentColor){
    $('#'+currentColor).addClass('pressed');
    setTimeout(function (){
        $('#'+currentColor).removeClass('pressed');
    },100);
}

function startOver(){
    level = 0;
    started = false;
    gamePattern = [];
}