export class Projectile{

    constructor(x, y, width, height, speed, damage, color, direction){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.damage = damage;
        this.color = color;
        this.direction = direction;
        this.markForDeletion = false;
    }

    //Abstract function to draw the projectile
    draw(ctx){}

    move(deltaTime){
        if(this.direction > 0){
            this.x += this.speed*deltaTime;
        }else if (this.direction <0){
            this.x -= this.speed*deltaTime;
        }
    }

}