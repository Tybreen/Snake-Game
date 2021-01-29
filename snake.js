var cvs = document.getElementById("Snake");
var ctx = cvs.getContext("2d");


var up = new Audio();
var down = new Audio();
var left = new Audio();
var right  = new Audio();
var eat = new Audio();
var dead = new Audio();

up.src = "up.mp3";
down.src = "down.mp3";
left.src = "left.mp3";
right.src = "right.mp3";
eat.src = "eat.mp3";
dead.src = "dead.mp3";

var Box = 32;

var ground = new Image();
var food = new Image();

ground.src = "ground.png";
food.src = "food.png";

var Snake = [];

Snake[0] = {
    x: 9 * Box,
    y: 10 * Box
}

var Food = {
    x: Math.floor(Math.random() * 17 + 1) * Box,
    y: Math.floor(Math.random() * 15 + 3) * Box
}

function InstructionText() {

    ctx.fillStyle = "black";
    ctx.font = "40px Changa one";
    ctx.fillText("Snake Game", 30, 100);

    ctx.font = "20px Changa one";
    ctx.fillText("You are a snake, looking to eat apples which help you grow. Move ", 30, 140);
    ctx.fillText("around the game board by using the arrow keys on your keyboard. ", 30, 160);
    ctx.fillText("(If you prefer left handed controls, you can use the [A], [S], [D], [W] ", 30, 180);
    ctx.fillText("keys as well)", 30, 200);

    ctx.fillText("Your snake will die (game over) if you crash into one of the outer walls ", 30, 240);
    ctx.fillText("OR if you run into yourself. Keep that in mind, when you try to turn ", 30, 260);
    ctx.fillText("around! If you're moving upward, and you press the down arrow, ", 30, 280);
    ctx.fillText("you'll run into yourself... instead you have to turn right or left and then ", 30, 300);
    ctx.fillText("down. ", 30, 320);

    ctx.fillText("After every 5 apples, your snake will move quicker too!  See how high ", 30, 360);
    ctx.fillText("you can get your score!", 30, 380);

    ctx.fillText("When the game ends, you can press the [spacebar] to begin again!", 30, 420);

    ctx.font = "23px Changa one";
    ctx.fillText("If you are ready to begin, press the [spacebar].", 100, 520);
    ctx.fillText("Thanks for playing!", 210, 560);
}


var Score = 0;
var dir;
document.addEventListener("keydown", Direction);

function Direction(event) {
    var Key = event.keyCode;
    //if(dir != "RIGHT" && Key == 65 || Key == 37) {
    if(dir != "RIGHT" && Key == 65 || dir != "RIGHT" && Key == 37) {
        dir = "LEFT";
        left.play();
    }

    else if (dir != "DOWN" && Key == 87 || dir != "DOWN" && Key == 38 ) {
        dir = "UP";
        up.play();
    }

    else if (dir != "LEFT" && Key == 68 || dir != "LEFT" && Key == 39) {
        dir = "RIGHT";
        right.play();
    }

    else if (dir != "UP" && Key == 83 || dir != "UP" && Key == 40) {
        dir = "DOWN";
        down.play();
    }
    console.log(dir);
}

function Collision(Head, array) {
    for(var i = 0; i < array.length; i++) {
        
        if(Head.x == array[i].x && Head.y == array[i].y) {
            console.log("true");
            return true;
        }
    }
    console.log("false");
    return false;
}


var GamePlaying = false;
var Size = 0;

function Draw() {
    ctx.drawImage(ground, 0, 0);
    for(var i = 0; i < Snake.length ;i++) {
        if(i == 0) {
            ctx.fillStyle = "green";
        }
        else {
            ctx.fillStyle = "gray";
        }
        ctx.fillRect(Snake[i].x, Snake[i].y, Box, Box);
        ctx.strokeStyle = "green";
        ctx.strokeRect(Snake[i].x, Snake[i].y, Box, Box);
    }
    ctx.drawImage(food, Food.x, Food.y);


    var snakeX = Snake[0].x;
    var snakeY = Snake[0].y;

    if(dir == "LEFT") snakeX -= Box;
    if(dir == "RIGHT") snakeX += Box;
    if(dir == "UP") snakeY -= Box;
    if(dir == "DOWN") snakeY += Box;



    if(snakeX == Food.x && snakeY == Food.y) {
        eat.play();
        Score++;
        Size++;
        console.log(Size);
        Food = {
            x: Math.floor(Math.random() * 17 + 1) * Box,
            y: Math.floor(Math.random() * 15 + 3) * Box
        }
    }

    else {
        Snake.pop();
    }

    var newHead = {
        x: snakeX,
        y: snakeY
    }
    
    if(snakeX < Box || snakeX > 17 * Box || snakeY < 3 * Box || snakeY > 17 * Box || Collision(newHead, Snake)) {
        dead.play();
        clearInterval(game);
        GamePlaying = false;
    }

    Snake.unshift(newHead);

    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(Score, 2 * Box, 1.6 * Box);


    ctx.font = "30px Changa one"
    ctx.fillText("Speed Level " + SpeedText, 11.5 * Box, 1.6 * Box);

    if(NextScoreLevel == Score && SpeedText != "MAX") {
        Speed -= 5;
        SpeedText++;
        NextScoreLevel += 5;
    }
    if(Speed == 100) SpeedText = "MAX";

    if(Score > HiScore) HiScore++;

    ctx.font = "40px Changa one";
    ctx.fillText("High Score  " + HiScore, 3.5 * Box, 1.6 * Box);


}

document.addEventListener("keydown", InstructionTextUsingKey);

function InstructionTextUsingKey(event) {

    var Key = event.keyCode;

    if(Key == 73 && !GamePlaying) {
        InstructionText()
    }
}

InstructionText()

var NextScoreLevel = 5;
var Speed = 150;
var SpeedText = 1;
var HiScore = 0


document.addEventListener("keydown", StartGame);

function StartGame(event) {

    var Key = event.keyCode;

    if(Key == 32 && !GamePlaying) {
        GamePlaying = true;
        Score = 0;
        NextScoreLevel = 5;
        Speed = 150;
        game = setInterval(Draw, Speed);
        SpeedText = 1;
        dir = "none";
        Snake[0] = {
            x: 9 * Box,
            y: 10 * Box
        }
        Food = {
            x: Math.floor(Math.random() * 17 + 1) * Box,
            y: Math.floor(Math.random() * 15 + 3) * Box
        }

        for(var i = 0; i < Size; i++) {
            Snake.pop();
        }
        Size = 0;
    } 

}

let game;
