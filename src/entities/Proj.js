export class Projectile {
    constructor(tx, ty, enemy) {
        this.width = 5;
        this.height = 5;
        this.x = tx;
        this.y = ty;
        this.speed = 5;
        this.target = enemy;
        this.flag = 0;
    }

    draw(ctx) {
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x-(this.width/2), this.y-(this.height/2), this.width, this.height);
    }

    update() {
        let xdiff = this.target.x - this.x;
        let ydiff = this.target.y - this.y;
        let diff = Math.sqrt((xdiff**2) + (ydiff**2))
        if (diff > 15) {
            let ratio = this.speed / diff;
            this.x += xdiff * ratio;
            this.y += ydiff * ratio;
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