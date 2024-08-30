const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [{ x: 10, y: 10 }];
let food = { x: 15, y: 15 };
let dx = 0;
let dy = 0;
let score = 0;
let changingDirection = false;

function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);

    // Draw snake
    ctx.fillStyle = 'green';
    snake.forEach(segment => ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize));

    // Draw score
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + score, 10, canvas.height - 10);

    moveSnake();
    checkCollision();
    checkFoodCollision();
    changingDirection = false;
}

function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);
    snake.pop();
}

function checkCollision() {
    const head = snake[0];
    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount || collisionWithSelf()) {
        resetGame();
    }
}

function collisionWithSelf() {
    const head = snake[0];
    return snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y);
}

function checkFoodCollision() {
    const head = snake[0];
    if (head.x === food.x && head.y === food.y) {
        snake.push({ ...snake[snake.length - 1] });
        score++;
        generateFood();
    }
}

function generateFood() {
    food.x = Math.floor(Math.random() * tileCount);
    food.y = Math.floor(Math.random() * tileCount);
}

function resetGame() {
    snake = [{ x: 10, y: 10 }];
    dx = 0;
    dy = 0;
    score = 0;
    generateFood();
}

function changeDirection(event) {
    if (changingDirection) return;
    changingDirection = true;

    const keyPressed = event.key;
    if (keyPressed === 'ArrowUp' && dy === 0) {
        dx = 0;
        dy = -gridSize;
    } else if (keyPressed === 'ArrowDown' && dy === 0) {
        dx = 0;
        dy = gridSize;
    } else if (keyPressed === 'ArrowLeft' && dx === 0) {
        dx = -gridSize;
        dy = 0;
    } else if (keyPressed === 'ArrowRight' && dx === 0) {
        dx = gridSize;
        dy = 0;
    }
}

document.addEventListener('keydown', changeDirection);

setInterval(draw, 100);
