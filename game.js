const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let player = {
x: 380,
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

function startGame(){

document.getElementById("menu").style.display = "none";

gameRunning = true;

spawnAsteroid();

gameLoop();

}

function spawnAsteroid(){

setInterval(()=>{

asteroids.push({

x:Math.random()*760,
y:-60,
width:60,
height:60,
speed:3+Math.random()*3

});

},1000);

}

document.addEventListener("keydown",(e)=>{

if(e.key==="ArrowLeft"){
player.x-=player.speed;
}

if(e.key==="ArrowRight"){
player.x+=player.speed;
}

});

function update(){

asteroids.forEach(a=>{
a.y+=a.speed;
});

asteroids = asteroids.filter(a=>{

if(a.y>600){
score++;
document.getElementById("score").innerText=score;
return false;
}

return true;

});

}

function draw(){

ctx.clearRect(0,0,canvas.width,canvas.height);

ctx.drawImage(playerImg,player.x,player.y,player.width,player.height);

asteroids.forEach(a=>{

ctx.drawImage(asteroidImg,a.x,a.y,a.width,a.height);

});

}

function gameLoop(){

if(!gameRunning) return;

update();
draw();

requestAnimationFrame(gameLoop);

}
