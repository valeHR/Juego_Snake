const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gridSize = 20;
let snake = [{ x: 100, y: 100 }];
let food = { x: 200, y: 200 };
let dx = gridSize;
let dy = 0;
let score = 0;

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    
    snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? '#4CAF50' : '#388E3C';
        ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
    });

    
    ctx.fillStyle = '#FF6347';
    ctx.fillRect(food.x, food.y, gridSize, gridSize);

    
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

   
    if (head.x === food.x && head.y === food.y) {
        score++;
        generateFood();
    } else {
        snake.pop();
    }

   
    if (
        head.x < 0 ||
        head.x >= canvas.width ||
        head.y < 0 ||
        head.y >= canvas.height ||
        collision(head)
    ) {
        resetGame();
    }

    
    ctx.fillStyle = '#333';
    ctx.font = '16px Arial';
    ctx.fillText('Puntaje: ' + score, 10, 20);

    setTimeout(drawGame, 100);
}

function collision(head) {
    return snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y);
}

function generateFood() {
    const x = Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize;
    const y = Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize;
    food = { x, y };
}

function resetGame() {
    snake = [{ x: 100, y: 100 }];
    dx = gridSize;
    dy = 0;
    score = 0;
    generateFood();
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp' && dy === 0) {
        dx = 0;
        dy = -gridSize;
    } else if (e.key === 'ArrowDown' && dy === 0) {
        dx = 0;
        dy = gridSize;
    } else if (e.key === 'ArrowLeft' && dx === 0) {
        dx = -gridSize;
        dy = 0;
    } else if (e.key === 'ArrowRight' && dx === 0) {
        dx = gridSize;
        dy = 0;
    }
});

generateFood();
drawGame();
