export class Player {
    constructor(gameWidth, gameHeight, towers) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.width = 35;
        this.height = 35;
        this.x = 300;
        this.y = 300;
        this.gridx = 4;
        this.gridy = 4;
        this.hp = 100;
        this.iframes = 0;
        this.speed = 5;
        this.cooldown = 0;
        this.towers = towers;
    }

    draw(ctx) {
        if (this.iframes > 0) {
            if (Math.floor(this.iframes/10) % 2 == 0) {
                ctx.fillStyle = 'black';
                ctx.fillRect(this.x-(this.width/2), this.y-(this.height/2), this.width, this.height);
            }
            this.iframes--;
        }

        else {
            ctx.fillStyle = 'black';
            ctx.fillRect(this.x-(this.width/2), this.y-(this.height/2), this.width, this.height);
        }
    }

    update(input) {
        if (input.keys.includes('ArrowRight')) this.x += this.speed;
        if (input.keys.includes('ArrowLeft')) this.x -= this.speed;

        if (input.keys.includes('ArrowUp')) this.y -= this.speed;
        if (input.keys.includes('ArrowDown')) this.y += this.speed;

        this.gridx = Math.floor(this.x/50) - 2;
        this.gridy = Math.floor(this.y/50) - 2;

        if (this.cooldown == 0) {
            if (input.keys.includes('t')) {
                if (0 <= this.gridx && this.gridx <= 7 && 0 <= this.gridy && this.gridy <= 7) {
                    this.towers[this.gridx][this.gridy].type = 1;
                    this.cooldown = 60;
                }
            }
        }
        else {
            this.cooldown--;
        }

        if (this.x < 0) this.x = 0;
        if (this.x > this.gameWidth) this.x = this.gameWidth;
        if (this.y < 0) this.y = 0;
        if (this.y > this.gameHeight) this.y = this.gameHeight;
    }
}