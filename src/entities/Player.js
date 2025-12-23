export class Player {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.width = 35;
        this.height = 35;
        this.x = 0;
        this.y = gameHeight - this.height;
        this.speed = 5;
    }

    draw(ctx) {
        ctx.fillStyle = 'black';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    update(input) {
        if (input.keys.includes('ArrowRight')) this.x += this.speed;
        if (input.keys.includes('ArrowLeft')) this.x -= this.speed;

        if (input.keys.includes('ArrowUp')) this.y -= this.speed;
        if (input.keys.includes('ArrowDown')) this.y += this.speed;

        if (this.x < 0) this.x = 0;
        if (this.x > this.gameWidth - this.width) this.x = this.gameWidth - this.width;
        if (this.y < 0) this.y = 0;
        if (this.y > this.gameHeight - this.height) this.y = this.gameHeight - this.height;
    }
}