import { TowerProjectile } from './Proj.js';
const towerSprite = new Image();
towerSprite.src = 'src/assets/tower1.png';
const wallSprite = new Image();
wallSprite.src = 'src/assets/wall.png';

const WIDTH = 50
const HEIGHT = 50

export class Tower {
    constructor(x, y, hp, tan, sprite) {
        this.sprite = sprite;
        this.bmode = 0;
        this.tangible = tan
        this.x = x;
        this.y = y;
        this.hp = hp;
    }

    update() {}

    draw(ctx) {

        if (this.bmode) {
            const drawX = this.x - (WIDTH / 2);
            const drawY = this.y - (HEIGHT / 2);

            ctx.save();
            ctx.strokeStyle = 'yellow';
            ctx.lineWidth = 2;

            ctx.strokeRect(drawX, drawY, WIDTH - 1, HEIGHT - 1);
        
            ctx.restore();
        }
        
        if (this.sprite) {
            ctx.drawImage( 
                this.sprite,
                this.x - (WIDTH / 2),
                this.y - (HEIGHT / 2),
                WIDTH,
                HEIGHT
            );
        }
    }
}

export class WizardTower extends Tower {
    constructor(x, y) {
        super(x, y, 1000, true, towerSprite);
        this.cooldown = 0;
        this.range = 150;
        this.atkspeed = 30;
        this.projspeed = 10;
    }

    update(projectiles, enemies) {
        if (this.cooldown == 0) {
            let best;
            let bdiff;
            for (const enemy of enemies) {
                let xdiff = enemy.x - this.x;
                let ydiff = enemy.y - this.y;
                let diff = Math.sqrt((xdiff**2) + (ydiff**2));
                if (this.range > diff) {
                    if (best) {
                        if (bdiff < diff) {
                            continue;
                        }
                    }
                    best = enemy;
                    bdiff = diff;
                }
            }
            if (best) {
                projectiles.push(new TowerProjectile(this.x, this.y-20, best, 0));
                this.cooldown = 60;
            }
        }
        else {
            this.cooldown -= 1;
        }
    }
}

export class Wall extends Tower {
    constructor(x, y) {
        super(x, y, 2000, true, wallSprite);
    }

    update() {
    }
}