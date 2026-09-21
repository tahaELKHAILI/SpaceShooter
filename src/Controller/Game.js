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
let playerProjectiles = [];
let score = 0;
const gameState = {isPaused : false};

// Initialise the game elements
function start(){
    player = new Scout(50, canvas.height/2);
    gameMap = new Map(canvas.width, canvas.height);
    input = new InputHandler(gameState);

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


    if(input.isPressed(" ")){
        let playerShot = player.shoot(currentTime);
        if(playerShot){
            playerProjectiles.push(playerShot);
        }
    }

    if(playerProjectiles.length != 0){
        playerProjectiles.forEach((projectile)=>{
            projectile.move(deltaTime);
        });

        checkCollision()
    }

    enemies = enemies.filter(enemy => !enemy.markForDeletion);
    playerProjectiles = playerProjectiles.filter(projectile => !projectile.markForDeletion);

    //Score board
    ctx.font = "30px Arial";
    ctx.fillStyle = "red";
    ctx.fillText("Score: "+ score, 10,25);
}

function end(){}

//Game loop
function gameLoop(currentTime){
    let deltaTime = currentTime - lastTime;
    if (deltaTime > 100) 
        deltaTime = 16.67; 
    lastTime = currentTime;
    const normalizedDelta = deltaTime / 16.67;

    if(!gameState.isPaused){
        update(normalizedDelta, currentTime);
    }
    render();

    if (gameState.isPaused) {
        ctx.fillStyle = "rgba(0, 0, 0, 0.4)"; // Subtle dim effect
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = "white";
        ctx.font = "bold 30px Arial";
        ctx.textAlign = "center";
        ctx.fillText("PAUSED", canvas.width / 2, canvas.height / 2);
    }
    
    requestAnimationFrame(gameLoop);

}

function render(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    player.draw(ctx);
    gameMap.draw(ctx);
    
    enemies.forEach((enemy)=>{
        enemy.draw(ctx)
    });

    playerProjectiles.forEach((projectile)=>{
        projectile.draw(ctx)
    });

    ctx.font = "30px Arial";
    ctx.fillStyle = "red";
    ctx.fillText("Score: "+score, 10, 25);

}

function isHit(object1, object2){
    return (
        object1.x - object1.width < object2.x + object2.width &&  
        object1.x > object2.x &&  
        object1.y - (object1.height / 2) < object2.y + (object2.height / 2) && 
        object1.y + (object1.height / 2) > object2.y - (object2.height / 2)
    );
}


function checkCollision(){
    //Enemy taking damage
    playerProjectiles.forEach(projectile =>{
        enemies.forEach(enemy =>{
            if (isHit(projectile, enemy)){
                enemy.markForDeletion = true;
                projectile.markForDeletion = true;
                score += 1;
            }
        });

        if(projectile.x > canvas.width){
            projectile.markForDeletion = true;
        }
    });
}

//Game launch
start();