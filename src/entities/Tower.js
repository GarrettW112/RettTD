import { Projectile } from './Proj.js';

export class Tower {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.width = 35;
        this.height = 35;
        this.x = 400;
        this.y = 300;
        this.range = 80;
        this.xdiff;
        this.ydiff;
        this.diff;
        this.cooldown = 0;
    }

    draw(ctx) {
        ctx.fillStyle = 'blue';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    update(enemy, proj) {
        if (this.cooldown == 0) {
            this.xdiff = enemy.x - this.x;
            this.ydiff = enemy.y - this.y;
            this.diff = Math.sqrt((this.xdiff**2) + (this.ydiff**2));
            if (this.range > this.diff) {
                proj.push(new Projectile(this.gameWidth, this.gameHeight, this.x, this.y, enemy));
                this.cooldown = 360;
            }
        }
        else {
            this.cooldown -= 1
        }
    }
}