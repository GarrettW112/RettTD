import { Projectile } from './Proj.js';

export class Tower {
    constructor(gameWidth, gameHeight, x, y) {
        this.width = 50;
        this.height = 50;
        this.x = x;
        this.y = y;
        this.range = 150;
        this.xdiff;
        this.ydiff;
        this.diff;
        this.cooldown = 0;
    }

    draw0(ctx) {
        ctx.fillStyle = 'blue';
        ctx.fillRect(this.x-(this.width/2), this.y-(this.height/2), this.width, this.height);
    }

    draw1(ctx) {
        ctx.fillStyle = 'blue';
        ctx.fillRect(this.x-(this.width/2), this.y-(this.height/2), this.width, this.height);
    }

    draw2(ctx) {
        ctx.fillStyle = 'blue';
        ctx.fillRect(this.x-(this.width/2), this.y-(this.height/2), this.width, this.height);
    }

    update(enemies, proj) {
        if (this.cooldown == 0) {
            for (const enemy of enemies) {
                this.xdiff = enemy.x - this.x;
                this.ydiff = enemy.y - this.y;
                this.diff = Math.sqrt((this.xdiff**2) + (this.ydiff**2));
                if (this.range > this.diff) {
                    proj.push(new Projectile(this.gameWidth, this.gameHeight, this.x, this.y, enemy));
                    this.cooldown = 10;
                }
                break;
            }
        }
        else {
            this.cooldown -= 1
        }
    }
}