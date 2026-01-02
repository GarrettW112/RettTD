import { WizardTower } from './Tower.js'
import { PlayerProjectile } from './Proj.js';

const playerSprite = new Image();
playerSprite.src = 'src/assets/player.png';

const WIDTH = 50;
const HEIGHT = 50;

export class Player {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.x = 300;
        this.y = 300;
        this.hp = 100;
        this.iframes = 0;
        this.speed = 5;
        this.atkcooldown = 0;
        this.gold = 50;
        this.bmode = false;
        this.btoggle = true;
        this.mtoggle = true;
    }

    draw(ctx) {
        if (Math.floor(this.iframes/10) % 2 == 1) {
            ctx.save();
            ctx.globalAlpha = 0.2;
        }
        
        ctx.drawImage(
            playerSprite,
            this.x - (WIDTH / 2),
            this.y - (HEIGHT / 2),
            WIDTH,
            HEIGHT
            );

        ctx.restore();
    }

    update(input, towers, projectiles, enemies) {
        
        // If not in Buy-Mode checks attack cooldown
        if (this.atkcooldown == 0) {
            if (!this.bmode && input.mouse.down) {
                projectiles.push(
                    new PlayerProjectile(this.x, this.y, input.mouse.x, input.mouse.y, enemies));
                this.atkcooldown = 180;
            }
        }
        else {
            this.atkcooldown--;
        }
    

        // Creates new x and y position based on user input
        let x = this.x;
        let y = this.y;
        if (input.keys.includes('d') || input.keys.includes('ArrowRight')) {
            x += this.speed;
        }

        if (input.keys.includes('a') || input.keys.includes('ArrowLeft')) {
            x -= this.speed;
        }

        if (input.keys.includes('w') || input.keys.includes('ArrowUp')) {
            y -= this.speed;
        }

        if (input.keys.includes('s') || input.keys.includes('ArrowDown')) {
            y += this.speed;
        }

        // Converts x and y into tile values
        let gridx = Math.floor(x/50) - 2;
        let gridy = Math.floor(y/50) - 2;

        // Checks if new x and y are valid
        if (0 > gridx || gridx > 7 || 0 > gridy || gridy > 7
         || !towers[gridx][gridy].tangible) {

            this.x = x;
            this.y = y;

            if (this.x < 0) this.x = 0;
            if (this.x > this.gameWidth) this.x = this.gameWidth;
            if (this.y < 0) this.y = 0;
            if (this.y > this.gameHeight) this.y = this.gameHeight;
        }

        if (this.iframes > 0) {
            this.iframes--;
        }
    }
}