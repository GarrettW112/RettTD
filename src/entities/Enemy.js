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
        const newx = this.x + (xdiff * ratio);
        const newy = this.y + (ydiff * ratio);
        return [newx, newy, diff];
    }

    xtowers(x, y, towers) {
        const tempx = Math.floor(x/50);
        const tempy = Math.floor(y/50);
        if (tempx >= 2 && tempx <= 9 && tempy >= 2 && tempy <= 9) { 
            if (towers[tempx-2][tempy-2].tangible) {
                towers[tempx-2][tempy-2].hp--;
                if (towers[tempx-2][tempy-2].hp == 0) {
                        towers[tempx-2][tempy-2] = new Tower;
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

    update(player, towers) {

        // tdiff = this.diff(this.target.x, this.target.y);

        // for (const x of magic) {
        //     for (const y of x) {
        //         if (y.tangible)
        //         let tempdiff = this.diff(y.x, y.y)
        //         if (this.tdiff > tempdiff) {
        //             this.target = y;
        //             this.tdiff = tempdiff;
        //         }
        //     }
        // }

        const coords = this.move(player.x, player.y);
        if (this.diff(player.x, player.y) < 20) {
            if (player.iframes == 0) {
                player.hp -= 10;
                player.x += 30*(coords[0] - this.x);
                player.y += 30*(coords[1] - this.y);
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

export class Poltergheist extends Enemy {
    constructor(x, y) {
        super(x, y, 100, 1, wispSprite);

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
}

export class NecNovice extends Enemy {
    constructor(x, y) {
        super(x, y, 200, 2, wispSprite);
    }
}