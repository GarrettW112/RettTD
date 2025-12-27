const wispSprite = new Image();
wispSprite.src = 'src/assets/wisp.png';

export class Enemy {
    constructor(x, y, player, towers) {
        this.width = 35;
        this.height = 35;
        this.x = x;
        this.y = y;
        this.hp = 100;
        this.speed = 1;
        this.flag = 0;
        this.target = player;
        this.towers = towers;
    }

    draw(ctx) {
        ctx.drawImage(
            wispSprite,
            this.x - (this.width / 2),          // X position (centered)
            this.y - (this.height / 2),         // Y position (centered)
            this.width,                         // Width to draw
            this.height                         // Height to draw
            );
    }

    death(ctx) {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x-(this.width/2)+5, this.y-(this.height/2)+5, this.width+5, this.height+5);
    }

    update() {
        let xdiff = this.target.x - this.x;
        let ydiff = this.target.y - this.y;
        let diff = Math.sqrt((xdiff**2) + (ydiff**2))
        let ratio = this.speed / diff;
        if (diff > 20) {
            let x = this.x + (xdiff * ratio);
            let y = this.y + (ydiff * ratio);
            let tempx = Math.floor(x/50);
            let tempy = Math.floor(y/50);
            if (tempx > 2 && tempx < 9 && tempy > 2 && tempy < 9) { 
                if (this.towers[tempx-2][tempy-2].type == 0) {
                    this.x = x;
                    this.y = y;
                }
                else {
                    this.towers[tempx-2][tempy-2].hp--;
                    if (this.towers[tempx-2][tempy-2].hp == 0) {
                        this.towers[tempx-2][tempy-2].type = 0;
                    }
                }
            }
            else {
                this.x = x;
                this.y = y;
            }

        }
        else {
            if (this.target.iframes == 0) {
                this.target.hp -= 10;
                this.target.x += 30*(xdiff * ratio);
                this.target.y += 30*(ydiff * ratio);
                this.target.iframes = 100;
            }
        }
    }
}