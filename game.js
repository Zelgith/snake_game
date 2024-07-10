const game = document.getElementById("game");
const context = game.getContext("2d");
const scoreText = document.getElementById("score");
const bestText = document.getElementById("best");
function resizeGame() {
    game.width = 720;
    game.height = 720;
}

resizeGame();
window.addEventListener("resize", resizeGame);

//size of a tile
var grid = 40; //must be a divisor of width and height

//frames per second
var fps = 15;

var snake = {
    //position
    x: 120,
    y: 120,

    //velocity
    dx: grid,
    dy: 0,

    cells: [],

    //length
    maxCells: 2,
}
var apple = {
    //position
    x: 360,
    y: 360,
}
function getRandomInt(min,max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let score = 0;
let best = 0;
scoreText.innerText = `Current score: ${score}`;
bestText.innerText = `Best score: ${best}`;
function gameLoop() {
    setTimeout(() => {
        requestAnimationFrame(gameLoop);
    }, 1000 / fps)

    context.clearRect(0, 0, game.width, game.height);

    for (var x = 0; x <= game.width; x += grid) {
        context.moveTo (x, 0);
        context.lineTo(x, game.height);
    }

    for (var x = 0; x <= game.height; x += grid) {
        context.moveTo(0,x);
        context.lineTo(game.width, + x);
    }
    context.strokeStyle = "gray";
    context.stroke();

    snake.x += snake.dx;
    snake.y += snake.dy;

    if(snake.x < 0) {
        snake.x = game.width - grid;
    }
    else if(snake.x >= game.width) {
        snake.x = 0;
    }
    if(snake.y < 0) {
        snake.y = game.height - grid;
    }
    else if(snake.y >= game.height) {
        snake.y = 0;
    }


    //keeps track of cells occupied by snake
    snake.cells.unshift({x: snake.x, y: snake.y});

    if (snake.cells.length > snake.maxCells) {
        snake.cells.pop();
    }

    if (snake.cells.length > snake.maxCells) {
        snake.cells.pop();
    }


    context.fillStyle = "red";
    context.fillRect(apple.x, apple.y, grid, grid);

    context.fillStyle = "green";
    snake.cells.forEach(function(cell, index) {
        context.fillRect(cell.x, cell.y, grid, grid);

        //score
        if (cell.x === apple.x && cell.y === apple.y) {
            snake.maxCells++;
            score++;
            do {
                apple.x = getRandomInt(0, game.width / grid - 1) * grid;
                apple.y = getRandomInt(0, game.width / grid - 1) * grid;
            } while(apple.x === cell.x && apple.y === cell.y);
        }

        // lose
        for (var i = index + 1; i < snake.cells.length; i++) {
            if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
                if(score > best) {
                    best = score
                }
                score = 0;
                snake.x = 120;
                snake.y = 120;
                snake.cells = [];
                snake.maxCells = 4;
                snake.dx = grid;
                snake.dy = 0;
                apple.x = getRandomInt(0, game.width / grid - 1) * grid;
                apple.y = getRandomInt(0, game.width / grid - 1) * grid;
            }
        }
        scoretext.innerText = `Current score: ${score}`;
        besttext.innerText = `Best score: ${best}`;
    });
}

//movement
document.addEventListener("keydown", function(e) {
    if ((e.key === 'ArrowLeft' || e.key.toLowerCase() === 'a') && snake.dx === 0) {
        snake.dx = -grid;
        snake.dy = 0;
    }
    else if ((e.key === 'ArrowUp' || e.key.toLowerCase() === 'w')  && snake.dy === 0) {
        snake.dy = -grid;
        snake.dx = 0;
    }
    else if ((e.key === 'ArrowRight' || e.key.toLowerCase() === 'd') && snake.dx === 0) {
        snake.dx = grid;
        snake.dy = 0;
    }
    else if ((e.key === 'ArrowDown' || e.key.toLowerCase() === 's') && snake.dy === 0) {
        snake.dy = grid;
        snake.dx = 0;
    }
});

//run game
requestAnimationFrame(gameLoop);