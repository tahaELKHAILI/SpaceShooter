export class Ship{

    constructor(x, y, width, height, speed, fireRate, color, health){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.fireRate = fireRate;
        this.color = color;
        this.health = health;

        this.nextShotTime = 0;
    }

    takeDamage(damage){
        this.health -=damage;/*
        if(health <0){
            this.health = 0;
        }*/
    }

    // Abstract function to handle the drawing of the character
    // The reason behind this is to make sure we can have different shapes for our ships
    draw(){}

    // Abstract function to execute the move sequence
    move(){}

    // Abstract function to handle the shooting
    shoot(){}
}