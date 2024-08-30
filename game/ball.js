const gameBoard = document.getElementById('game-board');
const paddle = document.getElementById('paddle');
const ball = document.getElementById('ball');

let paddleX = gameBoard.offsetWidth / 2 - paddle.offsetWidth / 2;
let ballX = gameBoard.offsetWidth / 2 - ball.offsetWidth / 2;
let ballY = gameBoard.offsetHeight - paddle.offsetHeight - ball.offsetHeight - 10;
let ballSpeedX = 2;
let ballSpeedY = -2;

document.addEventListener('mousemove', (event) => {
    const rect = gameBoard.getBoundingClientRect();
    paddleX = event.clientX - rect.left - paddle.offsetWidth / 2;

    if (paddleX < 0) {
        paddleX = 0;
    } else if (paddleX + paddle.offsetWidth > gameBoard.offsetWidth) {
        paddleX = gameBoard.offsetWidth - paddle.offsetWidth;
    }

    paddle.style.left = `${paddleX}px`;
});

function moveBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballX <= 0 || ballX + ball.offsetWidth >= gameBoard.offsetWidth) {
        ballSpeedX *= -1;
    }

    if (ballY <= 0) {
        ballSpeedY *= -1;
    }

    if (ballY + ball.offsetHeight >= gameBoard.offsetHeight) {
        alert('Game Over');
        document.location.reload();
    }

    if (
        ballY + ball.offsetHeight >= gameBoard.offsetHeight - paddle.offsetHeight &&
        ballX + ball.offsetWidth >= paddleX &&
        ballX <= paddleX + paddle.offsetWidth
    ) {
        ballSpeedY *= -1;
    }

    ball.style.left = `${ballX}px`;
    ball.style.top = `${ballY}px`;
}

function gameLoop() {
    moveBall();
    requestAnimationFrame(gameLoop);
}

gameLoop();
