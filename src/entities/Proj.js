class Projectile {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.flag = 0;
    }

    move(targetx, targety, speed, size) {
        let xdiff = targetx - this.x;
        let ydiff = targety - this.y;
        let diff = Math.sqrt((xdiff**2) + (ydiff**2))
        if (diff > size) {
            let ratio = speed / diff;
            this.x += xdiff * ratio;
            this.y += ydiff * ratio;
        }
        else {
            this.flag = 1;
        }
    }
}

export class TowerProjectile extends Projectile {
    constructor(x, y, enemy) {
        super(x, y);
        this.speed = 5;
        this.size = 5;
        this.target = enemy;
    }

    draw(ctx) {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x-(this.size/2), this.y-(this.size/2), this.size, this.size);
    }
    
    update() {
        this.move(this.target.x, this.target.y, this.speed, this.size);
        if (this.flag == 1) {
            this.target.hp -= 25;
            if (this.target.hp <= 0) {
                this.target.flag = 1;
            }
        }
    }
}

export class PlayerProjectile extends Projectile {
    constructor(x, y, targetx, targety, enemies) {
        super(x, y);
        this.speed = 2;
        this.size = 15;
        this.flash = 0;
        this.targetx = targetx;
        this.targety = targety;
        this.enemies = enemies;
    }

    draw(ctx) {
        if (Math.floor(this.flash / 15) % 2 == 0) {
            ctx.fillStyle = 'blue';
            ctx.fillRect(this.x-(this.size/2), this.y-(this.size/2), this.size, this.size);
        }
    }

    update() {
        this.move(this.targetx, this.targety, this.speed, 20);
        if (this.flag == 1) {
            for (const enemy of this.enemies) {
                let xdiff = enemy.x - this.x;
                let ydiff = enemy.y - this.y;
                let diff = Math.sqrt((xdiff**2) + (ydiff**2))
                if (diff < (this.size * 10)) {
                    enemy.hp -= 50;
                    enemy.x += xdiff * (5/diff);
                    enemy.y += ydiff * (5/diff);
                }
            }
        }
        this.flash++;
    }
}