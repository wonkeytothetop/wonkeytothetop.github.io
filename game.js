const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const monkeyImg = new Image();
monkeyImg.src = 'monkey.png';
let monkey = { x: 250, y: 150, width: 100, height: 100, drinkLevel: 10 };
let clicks = 0;
let timeLeft = 10;
let level = 1;
let gameOver = false;
let highScore = 0;
let lastUpdateTime = Date.now();

function drawMonkey() {
    ctx.drawImage(monkeyImg, monkey.x, monkey.y, monkey.width, monkey.height);
    ctx.fillStyle = '#000';
    ctx.fillText('Drink Level: ' + monkey.drinkLevel + '%', monkey.x, monkey.y - 10);
}

function updateGame() {
    if (gameOver) {
        ctx.font = '30px Arial';
        ctx.fillStyle = '#ff4500';
        ctx.fillText('Game Over! High Score: ' + highScore, 150, 200);
        document.getElementById('restartButton').style.display = 'block';
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawMonkey();
    ctx.font = '20px Arial';
    ctx.fillStyle = '#000';
    ctx.fillText('Time Left: ' + timeLeft.toFixed(1) + 's', 10, 30);
    ctx.fillText('Level: ' + level, 10, 60);

    let currentTime = Date.now();
    let deltaTime = (currentTime - lastUpdateTime) / 1000;
    lastUpdateTime = currentTime;

    if (timeLeft > 0) {
        timeLeft -= deltaTime;
        if (clicks > 0) {
            monkey.drinkLevel -= clicks;
            clicks = 0;
        }
        if (monkey.drinkLevel <= 0) {
            level++;
            monkey.drinkLevel = monkey.drinkLevel + level * 2;
            timeLeft = 10;
        }
    } else {
        gameOver = true;
        highScore = Math.max(highScore, level);
    }

    requestAnimationFrame(updateGame);
}

canvas.addEventListener('click', () => {
    if (!gameOver) {
        clicks++;
    }
});

function restartGame() {
    monkey.drinkLevel = 10;
    clicks = 0;
    timeLeft = 10;
    level = 1;
    gameOver = false;
    lastUpdateTime = Date.now();
    document.getElementById('restartButton').style.display = 'none';
    updateGame();
}

monkeyImg.onload = () => {
    updateGame();
};

