import { Tower } from './Tower.js'

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

    xtowers(x, y, towers) {
        const tempx = Math.floor(x/50);
        const tempy = Math.floor(y/50);
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

        const coords = this.move(target.x, target.y);
        if (this.diff(player.x, player.y) < 20) {
            if (player.iframes == 0) {
                player.hp -= 10;
                player.x += 30*(coords[0]);
                player.y += 30*(coords[1]);
                player.iframes = 100;
            }
        }
        else {
            if (!this.xtowers(coords[0] + this.x, coords[1] + this.y, towers)) {
                this.x += coords[0];
                this.y += coords[1];
            }
        }
    }
}

export class Poltergheist extends Enemy {
    constructor(x, y) {
        super(x, y, 100, 1, wispSprite);
        this.xmove, this.ymove = move(300, 300);
    }

    update(player, towers) {
        
    }
}

export class Skeleton extends Enemy {
    constructor(x, y) {
        super(x, y, 50, 1, wispSprite);
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