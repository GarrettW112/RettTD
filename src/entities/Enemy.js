import { Tower } from './Tower.js'
import { Arrow } from './Proj.js'

const wispSprite = new Image();
wispSprite.src = 'src/assets/wisp.png';

const WIDTH = 50
const HEIGHT = 50

export class Enemy {
    constructor(x, y, hp, speed, sprite) {
        this.x = x;
        this.y = y;
        this.hp = hp;
        this.speed = speed;
        this.sprite = sprite;
        this.flag = false;
    }

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

    diff(x, y) {
        const xdiff = x - this.x;
        const ydiff = y - this.y;
        const diff = Math.sqrt((xdiff**2) + (ydiff**2));
        return diff;
    }

    move(x, y) {
        const xdiff = x - this.x;
        const ydiff = y - this.y;
        const diff = Math.sqrt((xdiff**2) + (ydiff**2));
        const ratio = this.speed / diff;
        const changex = xdiff * ratio;
        const changey = ydiff * ratio;
        return [changex, changey, diff];
    }

    xtowers(towers) {
        const tempx = Math.floor(this.x/50);
        const tempy = Math.floor(this.y/50);
        if (tempx >= 2 && tempx <= 9 && tempy >= 2 && tempy <= 9) { 
            if (towers[tempx-2][tempy-2].tangible) {
                towers[tempx-2][tempy-2].hp--;
                if (towers[tempx-2][tempy-2].hp == 0) {
                        towers[tempx-2][tempy-2] = 
                        new Tower(
                            towers[tempx-2][tempy-2].x, 
                            towers[tempx-2][tempy-2].y, 
                            towers[tempx-2][tempy-2].bmode
                        );
                    }
                return true;
            }
        }
        return false;
    }

    xplayer(player) { 
        if (this.diff(player.x, player.y) < 20) {
            if (player.iframes == 0) {
                player.hp -= 10;
                player.x += 5*(player.x - this.x);
                player.y += 5*(player.y - this.y);
                player.iframes = 100;
            }
            return true;
        }
        return false;
    }
}

export class Wisp extends Enemy {
    constructor(x, y) {
        super(x, y, 100, 2, wispSprite);
    }

    update(player, towers, magic) {

        let target = player;

        let tdiff = this.diff(target.x, target.y);

        for (const x of magic) {
            let tempdiff = this.diff(x.x, x.y);
            if (tdiff > tempdiff) {
                target = x;
                tdiff = tempdiff;
            }
        }

        if (!this.xtowers(towers) && !this.xplayer(player)) {
            const coords = this.move(target.x, target.y);
            this.x += coords[0];
            this.y += coords[1];
        }
    }
}

export class Poltergheist extends Enemy {
    constructor(x, y) {
        super(x, y, 100, 1, wispSprite);
        this.xmove, this.ymove = move(300, 300);
    }

    update(player, core) {
        if (this.diff(core.x, core.y) < 25) {
            core.hp--;
        }
        else {
            this.x += this.xmove;
            this.y += this.ymove;
        }
    }
}

export class Skeleton extends Enemy {
    constructor(x, y) {
        super(x, y, 50, 1, wispSprite);
        this.atkcd = 150;
    }

    update(player, towers, magic, projectiles) {
        let target = player;

        let tdiff = this.diff(target.x, target.y);

        for (const x of magic) {
            let tempdiff = this.diff(x.x, x.y);
            if (tdiff > tempdiff) {
                target = x;
                tdiff = tempdiff;
            }
        }

        if (tdiff <= 200) {
            if (this.atkcd == 0) {
                const xdiff = target.x - this.x;
                const ydiff = target.y - this.y;
                const xrat = xdiff / Math.sqrt(xdiff**2 + ydiff**2);
                const yrat = ydiff / Math.sqrt(xdiff**2 + ydiff**2);
                projectiles.push(new Arrow(this.x, this.y, xrat, yrat));
                this.atkcd = 150;
            }
            else {
                this.atkcd--;
            }
        }

        else {
            const coords = this.move(target.x, target.y);
            this.x += coords[0];
            this.y += coords[1];
        }
    }
}

export class Zombie extends Enemy {
    constructor(x, y) {
        super(x, y, 200, 1, wispSprite)
    }
}

export class Golem extends Enemy {
    constructor(x, y) {
        super(x, y, 400, .5, wispSprite);
    }

    update(player, towers) {

        let target = towers[3][3];

        let tdiff = this.diff(target.x, target.y);

        for (const x of towers) {
            for (const y of x) {
                let tempdiff = this.diff(y.x, y.y);
                if (tdiff > tempdiff) {
                    target = y;
                    tdiff = tempdiff;
                }
            }
        }

        const coords = this.move(target.x, target.y);
        if (this.diff(player.x, player.y) < 20) {
            if (player.iframes == 0) {
                player.hp -= 10;
                player.x += 20*(coords[0] - this.x);
                player.y += 20*(coords[1] - this.y);
                player.iframes = 100;
            }
        }
        else {
            if (!this.xtowers(coords[0], coords[1], towers)) {
                this.x = coords[0];
                this.y = coords[1];
            }
        }
    }
}

export class NecNovice extends Enemy {
    constructor(x, y) {
        super(x, y, 200, 2, wispSprite);
    }
}