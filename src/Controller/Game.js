import {Scout} from '../Ships/Player/Scout.js';
import {loadPulse} from '../Ships/Enemy/EnemyLoader.js';
import {Map} from '../Map/Map.js';
import {InputHandler} from './InputHandler.js';


// Canvas reading
var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

let gameMap, player, input;
let enemies = [];
let enemyLoadInterval = 2000;
let nextEnemyLoadtime = enemyLoadInterval;
let lastTime = 0;
let projectiles = [];

// Initialise the game elements
function start(){
    player = new Scout(50, canvas.height/2);
    gameMap = new Map(canvas.width, canvas.height);
    input = new InputHandler();

    requestAnimationFrame(gameLoop);
}

// Update game object state
function update(deltaTime, currentTime){
    player.move(canvas.width,canvas.height, input,deltaTime);

    if(currentTime >= nextEnemyLoadtime){
        enemies.push(loadPulse(canvas.width, canvas.height));
        nextEnemyLoadtime +=enemyLoadInterval;
    }

    gameMap.moveStars(deltaTime);

    enemies.forEach((enemy)=>{
        enemy.move(deltaTime);
    });

    projectiles.push(player.shoot(input, currentTime));
    projectiles.forEach((projectile)=>{
        if(projectile != null)
            projectile.move(deltaTime);
    });

}

function end(){}

//Game loop
function gameLoop(currentTime){
    let deltaTime = currentTime - lastTime;
    if (deltaTime > 100) 
        deltaTime = 16.67; 
    lastTime = currentTime;
    const normalizedDelta = deltaTime / 16.67;

    update(normalizedDelta, currentTime);
    render();

    requestAnimationFrame(gameLoop);
}

function render(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    player.draw(ctx);
    gameMap.draw(ctx);
    
    enemies.forEach((enemy)=>{
        enemy.draw(ctx)
    });

    projectiles.forEach((projectile)=>{
        if(projectile != null)
            projectile.draw(ctx)
    });

}

//Game launch
start();