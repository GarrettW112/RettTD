export class Projectile {
    constructor(tx, ty, enemy) {
        this.width = 5;
        this.height = 5;
        this.x = tx;
        this.y = ty;
        this.speed = 5;
        this.target = enemy;
        this.xdiff;
        this.ydiff;
        this.diff;
        this.ratio;
        this.flag = 0;
    }

    draw(ctx) {
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x-(this.width/2), this.y-(this.height/2), this.width, this.height);
    }

    update() {
        this.xdiff = this.target.x - this.x;
        this.ydiff = this.target.y - this.y;
        this.diff = Math.sqrt((this.xdiff**2) + (this.ydiff**2))
        if (this.diff > 15) {
            this.ratio = this.speed / this.diff;
            this.x += this.xdiff * this.ratio;
            this.y += this.ydiff * this.ratio;
        }
        else {
            this.target.hp -= 25;
            this.flag = 1;
            if (this.target.hp == 0) {
                this.target.flag = 1;
            }
        }
    }
}