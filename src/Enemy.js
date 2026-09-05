import {Ship} from './Ship.js';

export class Enemy extends Ship {
    constructor(x, y){
        super(x, y, 50, 25, (Math.random()*3+5), '#27f55e', 100);
        this.markForDeletion = false;
    }

    draw(ctx){
        ctx.beginPath();
        ctx.moveTo(this.x, this.y); 
        ctx.lineTo(this.x + this.width, this.y - (this.height / 2));
        ctx.lineTo((this.x + this.width*0.7), this.y)
        ctx.lineTo(this.x + this.width, this.y + (this.height / 2));
        ctx.closePath();
        ctx.fillStyle = this.color; 
        ctx.fill(); 
        ctx.stroke();
    }

    //Todo: Automatique move of the enemy
    move(deltaTime){
        this.x -= this.speed*deltaTime;
                
        if(this.x <= 0){
            this.markForDeletion = true
        }
    }

    //Todo: Automatique shooting
    shoot(){}
}