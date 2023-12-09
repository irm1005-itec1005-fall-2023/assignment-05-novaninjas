
// Constants
const appID = "app";
const highScoreKey = "snakeHighScore";
const intructions= "intructions"

// Variables
let highScore = localStorage.getItem(highScoreKey) || 0;

// DOM Elements
let appContainer = document.getElementById(appID);

// Add a heading to the app container
function inititialise() {
 if (!appContainer) {
    console.error("Error: Could not find app container");
    return;
  }
  console.log("App successfully initialized");
  // Other initialization logic...
}

function openInstructions() {
    const instructionsModal = document.getElementById('instructionsModal');
    if (instructionsModal) {
      instructionsModal.style.display = 'block';
    }
  }


// Function to close instructions modal
function closeInstructions() {
    const instructionsModal = document.getElementById('instructionsModal');
    if (instructionsModal) {
      instructionsModal.style.display = 'none';
    }
  }


inititialise();

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const blockSize = 10;
const width = canvas.width / blockSize;
const height = canvas.height / blockSize;

let score = 0;

let snake = [
    { x: 5, y: 5 },
    { x: 4, y: 5 },
    { x: 3, y: 5 },
    { x: 2, y: 5 },
    { x: 1, y: 5 }
];

let food = { x: 10, y: 10 };

let direction = 'right';

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * blockSize, food.y * blockSize, blockSize, blockSize);

    ctx.fillStyle = 'green';
    snake.forEach((block) => {
        ctx.fillRect(block.x * blockSize, block.y * blockSize, blockSize, blockSize);
    });

    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, 10, 30);
    

    // Display the high score
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, 10, 30);
    ctx.fillText(`High Score: ${highScore}`, 10, 60);

}

function move() {
    const head = { x: snake[0].x, y: snake[0].y };

    switch (direction) {
        case 'up':
            head.y--;
            break;
        case 'down':
            head.y++;
            break;
        case 'left':
            head.x--;
            break;
        case 'right':
            head.x++;
            break;
    }

    if (head.x === food.x && head.y === food.y) {
        score++;
        snake.push({ x: snake[snake.length - 1].x, y: snake[snake.length - 1].y });
        food = {
            x: Math.floor(Math.random() * width),
            y: Math.floor(Math.random() * height)
        };
    } else {
        snake.pop();
    }

    snake.unshift(head);
}

function gameOver() {
    clearInterval(intervalId);
    const gameOverElement = document.getElementById('game-over');
    gameOverElement.innerHTML = 'Game Over!';
    gameOverElement.style.opacity = 1;
    if (score > highScore) {
        highScore = score;
        localStorage.setItem(highScoreKey, highScore);
    }
}
function checkCollision() {
    const head = snake[0];

    if (head.x < 0 || head.x >= width || head.y < 0 || head.y >= height) {
        gameOver();
    }

    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            gameOver();
        }
    }
}

function changeDirection(event) {
    switch (event.keyCode) {
        case 37:
            if (direction !== 'right') {
                direction = 'left';
            }
            break;
        case 38:
            if (direction !== 'down') {
                direction = 'up';
            }
            break;
        case 39:
            if (direction !== 'left') {
                direction = 'right';
            }
            break;
        case 40:
            if (direction !== 'up') {
                direction = 'down';
            }
            break;
    }
}

let intervalId = setInterval(() => {
    move();
    checkCollision();
    draw();
}, 100);

// Add click event listener to the Instructions button
inititialise();
const instructionsButton = document.getElementById('instructionsButton');
instructionsButton.addEventListener('click', openInstructions);

document.addEventListener('keydown', changeDirection);

