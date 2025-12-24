import { Tower } from './Tower.js';

export class Player {
    constructor(gameWidth, gameHeight, towers) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.width = 35;
        this.height = 35;
        this.x = 300;
        this.y = 300;
        this.hp = 100;
        this.speed = 5;
        this.cooldown = 0;
        this.towers = towers;
    }

    draw(ctx) {
        ctx.fillStyle = 'black';
        ctx.fillRect(this.x-(this.width/2), this.y-(this.height/2), this.width, this.height);
    }

    update(input) {
        if (input.keys.includes('ArrowRight')) this.x += this.speed;
        if (input.keys.includes('ArrowLeft')) this.x -= this.speed;

        if (input.keys.includes('ArrowUp')) this.y -= this.speed;
        if (input.keys.includes('ArrowDown')) this.y += this.speed;

        if (this.cooldown == 0) {
            if (input.keys.includes('t')) {
                this.towers.push(new Tower(this.gameHeight, this.gameWidth, this.x, this.y))
                this.cooldown = 360;
            }
        }
        else {
            this.cooldown--;
        }

        if (this.x < 0) this.x = 0;
        if (this.x > this.gameWidth - this.width) this.x = this.gameWidth - this.width;
        if (this.y < 0) this.y = 0;
        if (this.y > this.gameHeight - this.height) this.y = this.gameHeight - this.height;
    }
}