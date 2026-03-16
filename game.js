const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let player = {
    x: 370,
    y: 500,
    width: 60,
    height: 60,
    speed: 7
};

let asteroids = [];
let score = 0;
let gameRunning = false;

const playerImg = new Image();
playerImg.src = "images/R.png";

const asteroidImg = new Image();
asteroidImg.src = "images/1335902-middle.png";

function startGame() {

    document.getElementById("menu").style.display = "none";

    gameRunning = true;

    setInterval(spawnAsteroid, 1200);

    gameLoop();
}

function spawnAsteroid() {

    asteroids.push({
        x: Math.random() * (canvas.width - 60),
        y: -60,
        width: 60,
        height: 60,
        speed: 3
    });

}

document.addEventListener("keydown", function (e) {

    if (e.key === "ArrowLeft") {
        player.x -= player.speed;
    }

    if (e.key === "ArrowRight") {
        player.x += player.speed;
    }

});

function update() {

    for (let i = 0; i < asteroids.length; i++) {

        asteroids[i].y += asteroids[i].speed;

        if (asteroids[i].y > canvas.height) {

            asteroids.splice(i, 1);
            score++;

            document.getElementById("score").innerText = score;

        }

    }

}

function draw() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(playerImg, player.x, player.y, player.width, player.height);

    for (let i = 0; i < asteroids.length; i++) {

        let a = asteroids[i];

        ctx.drawImage(asteroidImg, a.x, a.y, a.width, a.height);

    }

}

function gameLoop() {

    if (!gameRunning) return;

    update();
    draw();

    requestAnimationFrame(gameLoop);

}
