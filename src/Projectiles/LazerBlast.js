import { Projectile } from "./Projectile.js";

export class LazerBlast extends Projectile{
    constructor(x,y,color,direction){
        super(x, y, 10, 5, 10, 2, color, direction)
    }

    draw(ctx){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

}