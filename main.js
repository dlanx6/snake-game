// Canvas
const canvas = document.querySelector("#canvas");
const context = canvas.getContext("2d");
const canvasHeight = canvas.height;
const canvasWidth = canvas.width;

// Game state
let running = true; 

// Score text
const scoreNumber = document.querySelector("#score-number");

// New game button
const newGameBtn = document.querySelector("#new-game-button");

// Score
let score = 0;

// Unit size
const UNIT = 20;

// Snake
const snakeColor = "#1fff0f";
let snake = [{x: (canvasWidth / 2) - (UNIT /2), y: (canvasHeight / 2) - (UNIT /2)}];

// Food
const foodColor = "Red";
let food = {x: Math.floor(Math.random() * canvasWidth / UNIT) * UNIT, y: Math.floor(Math.random() * canvasHeight / UNIT) * UNIT};

// Direction
let direction = {x: 0, y: 0};

// Draw snake
const drawSnake = () => {
    snake.forEach((element) => {
    context.fillStyle = snakeColor;
    context.fillRect(element.x, element.y, UNIT, UNIT);
    context.strokeStyle = "#000000";
    context.strokeRect(element.x, element.y, UNIT, UNIT);
})};

// Draw food 
const drawFood = () => {
    context.fillStyle = foodColor;
    context.fillRect(food.x, food.y, UNIT, UNIT);
};

// Move snake
const moveSnake = document.addEventListener("keydown", (event) => {
    const key = event.key.toLowerCase();

    if ((key === "arrowup" || key === "w") && direction.y === 0) direction = { x: 0, y: -1 };
    if ((key === "arrowdown" || key === "s") && direction.y === 0) direction = { x: 0, y: 1 };
    if ((key === "arrowleft" || key === "a") && direction.x === 0) direction = { x: -1, y: 0 };
    if ((key === "arrowright" || key === "d") && direction.x === 0) direction = { x: 1, y: 0 };
});

// New game button click
newGameBtn.addEventListener("click", () => {
    // Reset
    context.clearRect(0, 0, canvasWidth, canvasHeight);  
    score = 0;
    scoreNumber.textContent = score;
    direction = {x: 0, y: 0};
    snake = [{x: (canvasWidth / 2) - (UNIT /2), y: (canvasHeight / 2) - (UNIT /2)}];
    food = {x: Math.floor(Math.random() * canvasWidth / UNIT) * UNIT, y: Math.floor(Math.random() * canvasHeight / UNIT) * UNIT};
    drawSnake();
    drawFood();
    running = true
    gameLoop();
});

let timeout; 

// Game
const gameLoop = () => {
    if (running) {
        // Clear canvas every loop for animation
        context.clearRect(0, 0, canvasWidth, canvasHeight);
        let snakeHead = {x: snake[0].x + direction.x * UNIT, y: snake[0].y + direction.y * UNIT};
        snake.unshift(snakeHead);

        // Check collisions
        if (snakeHead.x < 0 || snakeHead.x >= canvasWidth || snakeHead.y < 0 || snakeHead.y >= canvasHeight) {
            running = false;  
        }

        // Check if food was eaten
        if (snakeHead.x === food.x && snakeHead.y === food.y) {
            score++;
            scoreNumber.textContent = score;
            food = {x: Math.floor(Math.random() * canvasWidth / UNIT) * UNIT, y: Math.floor(Math.random() * canvasHeight / UNIT) * UNIT};
        } 
        // Remove last segment for movement
        else {
            snake.pop();
        }

        drawSnake();
        drawFood();

        // Loop
        clearTimeout(timeout);
        timeout = setTimeout(gameLoop, 150);
    }
    else {
        context.clearRect(0, 0, canvasHeight, canvasWidth)
        context.font = '100px Arial';
        context.fillStyle = 'white';
        context.fillText('Game Over!', 17, (canvasHeight / 2) + 20);
        snakeHead = {x: (canvasWidth / 2) - (UNIT /2), y: (canvasHeight / 2) - (UNIT /2)};
    }
}


gameLoop();
