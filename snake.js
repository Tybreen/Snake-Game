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

var Score = 0;
var dir;
document.addEventListener("keydown", Direction);

function Direction(event) {
    var Key = event.keyCode;
    if(Key == 37 && dir != "RIGHT") {
        dir = "LEFT";
        left.play();
    }

    else if (Key == 38 && dir != "DOWN") {
        dir = "UP";
        up.play();
    }

    else if (Key == 39 && dir != "LEFT") {
        dir = "RIGHT";
        right.play();
    }

    else if (Key == 40 && dir != "UP") {
        dir = "DOWN";
        down.play();
    }

}

function Collision(Head, array) {
    for(var i = 0; i < array.length; i++) {
        if(Head.x == array[i].x && Head.y == array[i].y) {
            return true;
        }
    }
    return false;
}

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
    }

    Snake.unshift(newHead);

    ctx.fillStyle = "white";
    ctx.font = "45px Changa one"
    ctx.fillText(Score, 2 * Box, 1.6 * Box)

}


let game = setInterval(Draw, 150);
