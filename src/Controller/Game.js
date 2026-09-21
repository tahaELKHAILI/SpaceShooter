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
let gameTime = 0;
let nextEnemyLoadtime = enemyLoadInterval;
let lastTime = 0;
let playerProjectiles = [];
let score = 0;
const gameState = {isPaused : false,
    isGameOver : false
};

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

    enemies = enemies.filter(enemy => !enemy.markForDeletion);
    playerProjectiles = playerProjectiles.filter(projectile => !projectile.markForDeletion);

    gameTime += deltaTime * 16.67;

    if(gameTime >= nextEnemyLoadtime){
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
    }

    checkCollision()

}

function end(){}

//Game loop
function gameLoop(currentTime){
    let deltaTime = currentTime - lastTime;
    if (deltaTime > 100) 
        deltaTime = 16.67; 
    lastTime = currentTime;
    const normalizedDelta = deltaTime / 16.67;

    if(!gameState.isPaused && !gameState.isGameOver){
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

     
if (player.health <= 0) {
        gameState.isGameOver = true;

        // Darken screen background
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)"; 
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Game Over Text
        ctx.fillStyle = "red";
        ctx.font = "bold 50px Arial";
        ctx.textAlign = "center";
        ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2 - 20);

        // Final Score display
        ctx.fillStyle = "white";
        ctx.font = "24px Arial";
        ctx.fillText("Final Score: " + score, canvas.width / 2, canvas.height / 2 + 30);
        ctx.font = "18px Arial";
        ctx.fillText("Press F5 to Restart", canvas.width / 2, canvas.height / 2 + 70);
    }
    
    // Keep the animation loop running smoothly
    requestAnimationFrame(gameLoop);

}

function render(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    ctx.textAlign = "left"; 
    player.draw(ctx);
    gameMap.draw(ctx);
    
    enemies.forEach((enemy)=>{
        enemy.draw(ctx)
    });

    playerProjectiles.forEach((projectile)=>{
        projectile.draw(ctx)
    });

    //score board
    ctx.font = "30px Arial";
    ctx.fillStyle = "red";
    ctx.fillText("Score: "+score, 10, 25);

    //player healthbar
    ctx.fillText("Health: "+player.health, 10,canvas.height);

    //Game time
    ctx.fillText("Time: "+(gameTime/1000).toFixed(2), canvas.width/2, 25)
}

function isHit(object1, object2){
    return (
        object1.boundingBox.left < object2.boundingBox.left + object2.width &&   
        object1.boundingBox.left + object1.width > object2.boundingBox.left &&   
        object1.boundingBox.top < object2.boundingBox.top + object2.height &&  
        object1.boundingBox.top + object1.height > object2.boundingBox.top     
    );
}


function checkCollision(){
    //Enemy taking damage
    enemies.forEach(enemy => {
        if(isHit(player, enemy)){
            enemy.markForDeletion = true;
            player.takeDamage(10)
        }
    });

        
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
