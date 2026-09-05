export class Map{
    constructor(width, height){
        this.width = width;
        this.height = height;
        this.stars = [];
        this.generateStars(200)
    }

    generateStars(ammount){
        for (let i=0; i<ammount; i++){
            this.stars.push({
                x:Math.random()*this.width,
                y:Math.random()*this.height,
                size:Math.random()*3,
                speed:Math.random()*5+1
            });
        }
    }

    moveStars(deltaTime){
        this.stars.forEach(star =>{
            star.x -=star.speed*deltaTime;

            //This code reset the start of the stars
            if(star.x <0){
                star.x = this.width;
                star.y = Math.random()*this.height;
            }
        });
    }

    draw(ctx){
        ctx.fillStyle = '#ffffff';
        this.stars.forEach(star => {
            ctx.fillRect(star.x, star.y, star.size, star.size);
        });
    }

}