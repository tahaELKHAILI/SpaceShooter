import {Ship} from '../Ship.js';
import { LazerBlast } from '../../Projectiles/LazerBlast.js';

export class Scout extends Ship {
    constructor(x,y){
        super(x, y, 50, 25, 5, 250, '#F54927', 100)
    }


    draw(ctx){
        ctx.beginPath();
        ctx.moveTo(this.x, this.y); 
        ctx.lineTo(this.x - this.width, this.y + (this.height / 2));
        ctx.lineTo((this.x - this.width*0.7), this.y)
        ctx.lineTo(this.x - this.width, this.y - (this.height / 2));
        ctx.closePath();
        ctx.fillStyle = this.color; 
        ctx.fill(); 
        ctx.stroke();
    }

    move(Width, Height, input,deltaTime){
    //todo: Implement the collision
        //Vertical move
        if(input.isPressed("ArrowUp","w","W") && (this.y >this.height/2)){
            this.y -= this.speed*deltaTime;
        } else if (input.isPressed("ArrowDown","s", "S")&& (this.y <Height-(this.height/2))){
            this.y += this.speed*deltaTime;

        }

        //Horizontal move
        if(input.isPressed("ArrowLeft","a","A") && (this.x > this.width)){
            this.x -= this.speed*deltaTime;
        } else if (input.isPressed("ArrowRight","d","D") && (this.x < Width)){
            this.x += this.speed*deltaTime;
        }
    }

    //todo: shooting on enemy
    shoot(currentTime){
        if(currentTime <this.nextShotTime){
            return null;
        }

        this.nextShotTime = currentTime+this.fireRate;
        return new LazerBlast(this.x, this.y, "green", 1);
    }
}