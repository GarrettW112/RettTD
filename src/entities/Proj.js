import { Enemy } from './Enemy.js';

export class Projectile {
    constructor(gameWidth, gameHeight, tx, ty, enemy) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.width = 5;
        this.height = 5;
        this.x = tx;
        this.y = ty;
        this.speed = 5;
        this.target = enemy
        this.xdiff;
        this.ydiff;
        this.diff;
        this.ratio;
    }

    draw(ctx) {
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    update() {
        this.xdiff = this.targetx - this.x;
        this.ydiff = this.targety - this.y;
        this.diff = Math.sqrt((this.xdiff**2) + (this.ydiff**2))
        if (this.diff != 0) {
            this.ratio = this.speed / this.diff;
            this.x += this.xdiff * this.ratio;
            this.y += this.ydiff * this.ratio;
        }
    }
}