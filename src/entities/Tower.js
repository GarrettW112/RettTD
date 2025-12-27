import { Projectile } from './Proj.js';

const towerSprite = new Image();
towerSprite.src = 'src/assets/tower1.png';

export class Tower {
    constructor(x, y, projectiles, enemies) {
        this.width = 45;
        this.height = 45;
        this.x = x;
        this.y = y;
        this.range = 150;
        this.hp = 1000;
        this.cooldown = 0;
        this.type = 0;
        this.bflag = 0;
        this.projectiles = projectiles;
        this.enemies = enemies;
    }

    draw(ctx) {
        if (this.bflag == 0) {
            if (this.type == 0) {
            }
            else {
                ctx.drawImage(
                towerSprite,                       // The image variable we defined above
                this.x - (this.width / 2),          // X position (centered)
                this.y - (this.height / 2),         // Y position (centered)
                this.width,                         // Width to draw
                this.height                         // Height to draw
                );
            }
        }
    }

    update() {
        if (this.type == 1) {
            if (this.cooldown == 0) {
                let best;
                let bdiff;
                for (const enemy of this.enemies) {
                    let xdiff = enemy.x - this.x;
                    let ydiff = enemy.y - this.y;
                    let diff = Math.sqrt((xdiff**2) + (ydiff**2));
                    if (this.range > diff) {
                        if (best) {
                            if (bdiff < diff) {
                                best = enemy;
                                bdiff = diff;
                            }
                        }
                        else {
                            best = enemy;
                            bdiff = diff;
                        }
                    }
                }
                if (best) {
                    this.projectiles.push(new Projectile(this.x, this.y, best));
                    this.cooldown = 60;
                }
            }
            else {
                this.cooldown -= 1;
            }
        }
    }
}