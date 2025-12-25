import { Projectile } from './Proj.js';

export class Tower {
    constructor(x, y) {
        this.width = 45;
        this.height = 45;
        this.x = x;
        this.y = y;
        this.range = 150;
        this.xdiff;
        this.ydiff;
        this.diff;
        this.cooldown = 0;
        this.type = 0;
        this.bflag = 0;
    }

    draw(ctx) {
        if (this.bflag == 0) {
            if (this.type == 0) {
            }
            else {
                ctx.fillStyle = 'blue';
                ctx.fillRect(this.x-(this.width/2), this.y-(this.height/2), this.width, this.height);
            }
        }
    }

    update(enemies, proj) {
        if (this.type == 1) {
            if (this.cooldown == 0) {
                for (const enemy of enemies) {
                    this.xdiff = enemy.x - this.x;
                    this.ydiff = enemy.y - this.y;
                    this.diff = Math.sqrt((this.xdiff**2) + (this.ydiff**2));
                    if (this.range > this.diff) {
                        proj.push(new Projectile(this.x, this.y, enemy));
                        this.cooldown = 30;
                    }
                    break;
                }
            }
            else {
                this.cooldown -= 1
            }
        }
    }
}