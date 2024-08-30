const gameBoard = document.getElementById('game-board');
const boardSize = 20;
let snake = [{ x: 10, y: 10 }];
let food = { x: 5, y: 5 };
let dx = 1;
let dy = 0;
let gameInterval;

function createBoard() {
    for (let i = 0; i < boardSize * boardSize; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        gameBoard.appendChild(cell);
    }
}

function drawSnake() {
    snake.forEach(segment => {
        const index = segment.y * boardSize + segment.x;
        gameBoard.children[index].classList.add('snake');
    });
}

function drawFood() {
    const index = food.y * boardSize + food.x;
    gameBoard.children[index].classList.add('food');
}

function clearBoard() {
    Array.from(gameBoard.children).forEach(cell => {
        cell.classList.remove('snake');
        cell.classList.remove('food');
    });
}

function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        placeFood();
    } else {
        snake.pop();
    }

    if (head.x < 0 || head.x >= boardSize || head.y < 0 || head.y >= boardSize || snakeCollision(head)) {
        clearInterval(gameInterval);
        alert('Game Over');
    }
}

function snakeCollision(head) {
    return snake.some((segment, index) => index !== 0 && segment.x === head.x && segment.y === head.y);
}

function placeFood() {
    food = {
        x: Math.floor(Math.random() * boardSize),
        y: Math.floor(Math.random() * boardSize),
    };
}

function gameLoop() {
    clearBoard();
    moveSnake();
    drawSnake();
    drawFood();
}

function changeDirection(event) {
    const { keyCode } = event;

    if (keyCode === 37 && dx === 0) { // left arrow
        dx = -1;
        dy = 0;
    } else if (keyCode === 38 && dy === 0) { // up arrow
        dx = 0;
        dy = -1;
    } else if (keyCode === 39 && dx === 0) { // right arrow
        dx = 1;
        dy = 0;
    } else if (keyCode === 40 && dy === 0) { // down arrow
        dx = 0;
        dy = 1;
    }
}

createBoard();
drawSnake();
drawFood();
document.addEventListener('keydown', changeDirection);
gameInterval = setInterval(gameLoop, 200);
