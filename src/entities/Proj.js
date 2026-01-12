class Projectile {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.flag = false;
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
        }
    }
}

export class NecProjectile extends Projectile {
    constructor(x, y, enemy) {
        super(x, y);
        this.speed = 7;
        this.size = 5;
        this.target = enemy;
    }

    draw(ctx) {
        ctx.fillStyle = 'purple';
        ctx.fillRect(this.x-(this.size/2), this.y-(this.size/2), this.size, this.size);
    }
    
    update() {
        this.move(this.target.x, this.target.y, this.speed, this.size);
        if (this.flag == 1) {
            if (this.target.speed) {
                if (this.target.iframes == 0) {
                    this.target.hp -= 25;
                    this.target.iframes += 120;
                }
            }
            else {
                this.target.hp -= 100;
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
    }

    draw(ctx) {
        if (Math.floor(this.flash / 15) % 2 == 0) {
            ctx.fillStyle = "rgba(11, 0, 162, 1)";
        }
        else {
            ctx.fillStyle = "rgba(11, 0, 162, 0.2)";
        }
        ctx.fillRect(this.x-(this.size/2), this.y-(this.size/2), this.size, this.size);
    }

    update(enemies) {
        this.move(this.targetx, this.targety, this.speed, 20);
        if (this.flag == 1) {
            for (const enemy of enemies) {
                let xdiff = enemy.x - this.x;
                let ydiff = enemy.y - this.y;
                let diff = Math.sqrt((xdiff**2) + (ydiff**2))
                if (diff < (this.size * 10)) {
                    enemy.hp -= 25;
                    enemy.x += xdiff * (5/diff);
                    enemy.y += ydiff * (5/diff);
                    if (enemy.hp <= 0) {
                        enemy.flag = 1;
                    }
                }
            }
        }
        this.flash++;
    }
}

export class Arrow extends Projectile {
    constructor(x, y, xrat, yrat) {
        super(x, y);
        this.xrat = xrat;
        this.yrat = yrat;
        this.speed = 5;
        this.size = 10;
    }

    draw(ctx) {
        ctx.fillStyle = 'black';
        ctx.fillRect(this.x-(this.size/2), this.y-(this.size/2), this.size, this.size);
    }

    update(enemies, player, magic) {
        let diff = Math.sqrt(((player.x - this.x)**2) + ((player.y - this.y)**2));
        if (diff < 25 && player.iframes == 0) {
            player.hp -= 10;
            player.x += 5*(player.x - this.x);
            player.y += 5*(player.y - this.y);
            player.iframes = 100;
            this.flag = true;
        }

        else {
            for (const item of magic) {
                diff = Math.sqrt(((item.x - this.x)**2) + ((item.y - this.y)**2));
                if (diff < 20) {
                    item.hp -= 150;
                    this.flag = true;
                    break;
                }
            }
        }
        if (!this.flag) {
            this.x += (this.xrat * this.speed);
            this.y += (this.yrat * this.speed);
        }
    }

}