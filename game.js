const canvas = document.getElementById("game")
const ctx = canvas.getContext("2d")

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let gameRunning = false

let shipImg = new Image()
shipImg.src = "images/ship.png"

let meteorImg = new Image()
meteorImg.src = "images/meteor.png"

let explosionSound = new Audio("sounds/explosion.wav")

let stars = []

for(let i=0;i<200;i++){

stars.push({

x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
speed:1+Math.random()*2

})

}

let ship = {

x:200,
y:300,
size:60,
speed:6

}

let meteors = []
let score = 0
let difficulty = 1

function startGame(){

document.getElementById("menu").style.display="none"
gameRunning = true

}

function spawnMeteor(){

meteors.push({

x:Math.random()*canvas.width,
y:-100,
size:60,
speed:2+difficulty

})

}

setInterval(spawnMeteor,1200)

const keys = {}

document.addEventListener("keydown",e=>keys[e.key]=true)
document.addEventListener("keyup",e=>keys[e.key]=false)

canvas.addEventListener("touchmove",function(e){

let touch = e.touches[0]

ship.x = touch.clientX
ship.y = touch.clientY

})

function update(){

if(!gameRunning) return

if(keys["ArrowUp"]) ship.y -= ship.speed
if(keys["ArrowDown"]) ship.y += ship.speed
if(keys["ArrowLeft"]) ship.x -= ship.speed
if(keys["ArrowRight"]) ship.x += ship.speed

meteors.forEach(m=>{

m.y += m.speed

if(

ship.x < m.x + m.size &&
ship.x + ship.size > m.x &&
ship.y < m.y + m.size &&
ship.y + ship.size > m.y

){

explosionSound.play()
gameRunning=false
alert("Game Over - Score: "+score)

}

})

score++

difficulty += 0.001

document.getElementById("score").textContent = score

}

function drawStars(){

ctx.fillStyle="white"

stars.forEach(s=>{

s.y += s.speed

if(s.y > canvas.height) s.y = 0

ctx.fillRect(s.x,s.y,2,2)

})

}

function draw(){

ctx.clearRect(0,0,canvas.width,canvas.height)

drawStars()

ctx.drawImage(shipImg,ship.x,ship.y,ship.size,ship.size)

meteors.forEach(m=>{

ctx.drawImage(meteorImg,m.x,m.y,m.size,m.size)

})

}

function loop(){

update()
draw()

requestAnimationFrame(loop)

}

loop()
