export class Enemy {
    constructor(x, y, player) {
        this.width = 35;
        this.height = 35;
        this.x = x;
        this.y = y;
        this.hp = 100;
        this.speed = 1;
        this.flag = 0;
        this.xdiff;
        this.ydiff;
        this.diff;
        this.ratio;
        this.target = player;
    }

    draw(ctx) {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x-(this.width/2), this.y-(this.height/2), this.width, this.height);
    }

    death(ctx) {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x-(this.width/2)+5, this.y-(this.height/2)+5, this.width+5, this.height+5);
    }

    update() {
        this.xdiff = this.target.x - this.x;
        this.ydiff = this.target.y - this.y;
        this.diff = Math.sqrt((this.xdiff**2) + (this.ydiff**2))
        if (this.diff > 20) {
            this.ratio = this.speed / this.diff;
            this.x += this.xdiff * this.ratio;
            this.y += this.ydiff * this.ratio;
            let tempx = Math.floor(this.x/50) - 2
            let tempy = Math.floor(this.y/50) - 2
            if (0 <= tempx && tempx <= 7 && 0 <= tempy && tempy <= 7) {
                    this.towers[tempx][tempy].type = 1;
                    this.cooldown = 60;
            }
        }
        else {
            if (this.target.iframes == 0) {
                this.target.hp -= 10;
                this.target.x += 30*(this.xdiff * this.ratio);
                this.target.y += 30*(this.ydiff * this.ratio);
                this.target.iframes = 100;
            }
        }
    }
}