import {Ship} from '../Ship.js';
import { LazerBlast } from '../../Projectiles/LazerBlast.js';

export class Pulse extends Ship {
    constructor(x, y){
        super(x, y, 50, 25, 5, 250,'#27f55e', 100);
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
    shoot(currentTime){
        if(currentTime <this.nextShotTime){
            return null;
        }

        this.nextShotTime = currentTime+this.fireRate;
        return new LazerBlast(this.x, this.y, "yellow", -1);
    }
}