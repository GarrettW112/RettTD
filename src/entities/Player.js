export class Player {
    constructor(gameWidth, gameHeight, towers) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.width = 35;
        this.height = 35;
        this.x = 300;
        this.y = 300;
        this.hp = 100;
        this.iframes = 0;
        this.speed = 5;
        this.gold = 100;
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
        let x = this.x;
        let y = this.y;
        if (input.keys.includes('ArrowRight')) {
            x += this.speed;
        }

        if (input.keys.includes('ArrowLeft')) {
            x -= this.speed;
        }

        if (input.keys.includes('ArrowUp')) {
            y -= this.speed;
        }

        if (input.keys.includes('ArrowDown')) {
            y += this.speed;
        }

        let gridx = Math.floor(x/50) - 2;
        let gridy = Math.floor(y/50) - 2;

        if (0 <= gridx && gridx <= 7 && 0 <= gridy && gridy <= 7) {
            if (this.towers[gridx][gridy].type == 0) {
                this.x = x;
                this.y = y;
                if (this.cooldown == 0) {
                    if (input.keys.includes('t')) {
                        if (this.gold >= 50) {
                            this.towers[gridx][gridy].type = 1;
                            this.gold -= 50;
                            this.x = Math.round(this.x / 50) * 50;
                            this.y = Math.round(this.y / 50) * 50;
                            this.cooldown = 30;
                        }
                    }
                }
                else {
                    this.cooldown--;
                }
            }
        }
        else {
            this.x = x;
            this.y = y;
        }

        if (this.x < 0) this.x = 0;
        if (this.x > this.gameWidth) this.x = this.gameWidth;
        if (this.y < 0) this.y = 0;
        if (this.y > this.gameHeight) this.y = this.gameHeight;
    }
}