
var canvas = document.getElementById("zone_de_jeu");
const ctx = canvas.getContext("2d");
var interval = 100;
var gridsize = 10;
var snake = [
    { x: 200, y: 200 },
    { x: 190, y: 200 },
    { x: 180, y: 200 },
    { x: 170, y: 200 },
    { x: 160, y: 200 },
];

var dx = 10;
var dy = 0;
var gameStarted = false;
var apple = ApplesetNewPosition();
canvas.width = 500;
canvas.height = 500;
const centreX = canvas.width / 2;
const centreY = canvas.height / 2;

let position;
let score;
let tutoGameStarted = false;



function drawSnake() {
    ctx.fillStyle = "#ff0000";

    for (var i = 0; i < snake.length; i++) {
        ctx.fillRect(snake[i].x, snake[i].y, 10, 10);
    }
}



function drawScore(){
    ctx.save();
    ctx.font = "bold 200px sans-serif";
    ctx.fillStyle = "gray";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(score.toString(), centreX, centreY);
    ctx.restore();
}
function tuto(){
    ctx.font = "bold 70px sans-serif";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.strokeStyle = "white";
    ctx.lineWidth = "5";
    ctx.strokeText("SNAKE", centreX, centreY - 180); 
    ctx.fillText("SNAKE", centreX, centreY - 180);
    ctx.font = "bold 20px sans-serif";
    ctx.strokeText("Appuyer sur la touche espace pour jouer", centreX, centreY - 120);
    ctx.fillText("Appuyer sur la touche espace pour jouer", centreX, centreY - 120);
    ctx.strokeText("Déplacez-vous avec les fléche directionnel", centreX, centreY - 80);
    ctx.fillText("Déplacez-vous avec les fléche directionnel", centreX, centreY - 80);
    ctx.strokeText("Manger les pommes pour marqué des points", centreX, centreY - 40);
    ctx.fillText("Manger les pommes pour marqué des points", centreX, centreY - 40);
    ctx.strokeText("Vous perdez si vous rentrez  dans un mur ", centreX, centreY - 0);
    ctx.fillText("Vous perdez si vous rentrez  dans un mur", centreX, centreY - 0);
    ctx.strokeText(" ou dans vous", centreX, centreY - -40);
    ctx.fillText(" ou dans vous", centreX, centreY - -40);
}
function startGame() {
        snake = [
            { x: 200, y: 200 },
            { x: 190, y: 200 },
            { x: 180, y: 200 },
            { x: 170, y: 200 },
            { x: 160, y: 200 },
        ];
    
        score = 0;
        position = "droite";
        dx = 10;
        dy = 0;
        gameStarted = true;
        setTimeout(main, interval);
    

}

function moveSnake() {
    var snakeHead = { x: snake[0].x + dx, y: snake[0].y + dy };


  
    if (snakeHead.x === apple.x && snakeHead.y === apple.y) {

        apple = ApplesetNewPosition();
        score++;

    } else{
        snake.pop();
    }

    snake.unshift(snakeHead);
}

function gameOver() {
    ctx.save();
    ctx.font = "bold 70px sans-serif";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.strokeStyle = "white";
    ctx.lineWidth = "5";
    ctx.strokeText("Game Over", centreX, centreY - 180);
    ctx.fillText("Game Over", centreX, centreY - 180);
    ctx.font = "bold 20px sans-serif";
    ctx.strokeText("Appuyer sur la touche espace pour rejouer", centreX, centreY - 120);
    ctx.fillText("Appuyer sur la touche espace pour rejouer", centreX, centreY - 120);
    ctx.restore();
    gameStarted = false;
    apple = ApplesetNewPosition();

}
function drawScore(){
    ctx.save();
    ctx.font = "bold 200px sans-serif";
    ctx.fillStyle = "gray";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(score.toString(), centreX, centreY);
    ctx.restore();
  }

function checkCollision() {
    if (
        snake[0].x < 0 ||
        snake[0].x >= canvas.width ||
        snake[0].y < 0 ||
        snake[0].y >= canvas.height
    ) {
        gameOver();
    }
    for (var i = 4; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            gameOver();
        }
    }


}
document.addEventListener("DOMContentLoaded", () => {
    if (!gameStarted && !tutoGameStarted) {
        tuto() ;
    }
  });
document.addEventListener("keydown", function (event) {

    if (!gameStarted || event.keyCode === 32) {
        startGame();
        tutoGameStarted = true;
    } else {
        if (event.keyCode === 37 && position != "droite") {
            // gauche
            position = "gauche";
            dx = -10;
            dy = 0;
        } else if (event.keyCode === 38 && position != "bas") {
            // haut
            position = "haut";
            dx = 0;
            dy = -10;
        } else if (event.keyCode === 39 && position != "gauche") {
            // droite
            position = "droite";
            dx = 10;
            dy = 0;
        } else if (event.keyCode === 40 && position != "haut") {
            // bas
            position = "bas";
            dx = 0;
            dy = 10;
        }
    }
});
function apple_draw() {

    // ctx.arc(x,y, radius, 0, Math.PI*2, true);

    // ctx.fillArc(apple.x ,apple.y , radius, 0, Math.PI*2, true);
    ctx.fillStyle = "#33cc33";

    ctx.fillRect(apple.x, apple.y, gridsize, gridsize);

}

function ApplesetNewPosition() {

    // const newX = Math.round(Math.random() * (widthInBlocks - 1));
    // const newY = Math.round(Math.random() * (heightInBlocks - 1));

    
    return{ 
        x: Math.floor((Math.random() * canvas.width) / gridsize) * gridsize,

        y: Math.floor((Math.random() * canvas.height) / gridsize) * gridsize,
    };

  
}

function main() {

    // Effacer le canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dessiner le score    
    drawScore()

    // Mettre à jour la position du serpent
    moveSnake();

    // Vérifier les collisions
    checkCollision();

    // Dessiner le serpent
    drawSnake();
    
    // Dessiner la pomme
    apple_draw();


    if (gameStarted) {
        // Répéter la boucle

        setTimeout(main, interval);
    }


}

