export class Enemy {
    constructor(gameWidth, gameHeight, x, y) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.width = 35;
        this.height = 35;
        this.x = x;
        this.y = y;
        this.hp = 100
        this.speed = 1;
        this.xdiff;
        this.ydiff;
        this.diff;
        this.ratio;
    }

    draw(ctx) {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x-(this.width/2), this.y-(this.height/2), this.width, this.height);
    }

    death(ctx) {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x-(this.width/2)+5, this.y-(this.height/2)+5, this.width+5, this.height+5);
    }

    update(x, y) {
        this.xdiff = x - this.x;
        this.ydiff = y - this.y;
        this.diff = Math.sqrt((this.xdiff**2) + (this.ydiff**2))
        if (this.diff != 0) {
            this.ratio = this.speed / this.diff;
            this.x += this.xdiff * this.ratio;
            this.y += this.ydiff * this.ratio;
        }
    }
}