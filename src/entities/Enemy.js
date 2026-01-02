import { Tower } from './Tower.js'

const wispSprite = new Image();
wispSprite.src = 'src/assets/wisp.png';

const WIDTH = 50
const HEIGHT = 50

export class Enemy {
    constructor(x, y, player, towers) {
        this.x = x;
        this.y = y;
        this.hp = 100;
        this.flag = 0;
        this.speed = 1;
    }

    draw(ctx) {
        ctx.drawImage(
            wispSprite,
            this.x - (WIDTH / 2),
            this.y - (HEIGHT / 2),
            WIDTH,
            HEIGHT
            );
    }

    update(player, towers) {
        let xdiff = player.x - this.x;
        let ydiff = player.y - this.y;
        let diff = Math.sqrt((xdiff**2) + (ydiff**2))
        let ratio = this.speed / diff;
        if (diff > 20) {
            let x = this.x + (xdiff * ratio);
            let y = this.y + (ydiff * ratio);
            let tempx = Math.floor(x/50);
            let tempy = Math.floor(y/50);
            if (tempx > 2 && tempx < 9 && tempy > 2 && tempy < 9) { 
                if (!towers[tempx-2][tempy-2].tangible) {
                    this.x = x;
                    this.y = y;
                }
                else {
                    towers[tempx-2][tempy-2].hp--;
                    if (towers[tempx-2][tempy-2].hp == 0) {
                        towers[tempx-2][tempy-2] = new Tower;
                    }
                }
            }
            else {
                this.x = x;
                this.y = y;
            }

        }
        else {
            if (player.iframes == 0) {
                player.hp -= 10;
                player.x += 30*(xdiff * ratio);
                player.y += 30*(ydiff * ratio);
                player.iframes = 100;
            }
        }
    }
}