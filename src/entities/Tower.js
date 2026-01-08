import { TowerProjectile } from './Proj.js';
const towerSprite = new Image();
towerSprite.src = 'src/assets/tower1.png';
const wallSprite = new Image();
wallSprite.src = 'src/assets/wall.png';

const WIDTH = 50
const HEIGHT = 50

export class Tower {
    constructor(x, y, bmode, sprite) {
        this.x = x;
        this.y = y;
        this.tangible = false;
        this.hp = 100;
        this.sprite = sprite;
    }

    update() {}

    draw(ctx) {
        
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
    constructor(x, y, bmode) {
        super(x, y, bmode, towerSprite);
        this.tangible = true;
        this.hp = 1000;
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

export class Core extends Tower {
    constructor(x, y) {
        super(x, y, false, coreSprite);
        this.tangible = false;
        this.hp = 3000;
    }
}

export class Wall extends Tower {
    constructor(x, y, bmode) {
        super(x, y, bmode, wallSprite);
        this.tangible = true;
        this.hp = 2000;
    }

    update() {
    }
}