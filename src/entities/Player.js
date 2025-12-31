import { WizardTower } from './Tower.js'
import { PlayerProjectile } from './Proj.js';

const playerSprite = new Image();
playerSprite.src = 'src/assets/player.png';

export class Player {
    constructor(gameWidth, gameHeight, towers, enemies, projectiles) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.width = 35;
        this.height = 35;
        this.x = 300;
        this.y = 300;
        this.hp = 100;
        this.iframes = 0;
        this.speed = 5;
        this.atkcooldown = 0;
        this.bmode = false;
        this.bcooldown = 0;
        this.towers = towers;
        this.projectiles = projectiles;
        this.enemies = enemies;
    }

    draw(ctx) {
        if (this.iframes > 0) {
            if (Math.floor(this.iframes/10) % 2 == 0) {
                ctx.drawImage(
                    playerSprite,
                    this.x - (this.width / 2),
                    this.y - (this.height / 2),
                    this.width,
                    this.height
                    );
            }
            this.iframes--;
        }

        else {
            ctx.drawImage(
                    playerSprite,
                    this.x - (this.width / 2),
                    this.y - (this.height / 2),
                    this.width,
                    this.height
                    );
        }
    }

    update(input) {

        // Checks whether the player is in Buy-Mode
        if (this.bmode) {
            if (input.mouse.down) {
                let gridx = Math.floor(input.mouse.x/50) - 2;
                let gridy = Math.floor(input.mouse.y/50) - 2;
                if (0 <= gridx && gridx <= 7 && 0 <= gridy && gridy <= 7) {
                    this.towers[gridx][gridy] = 
                        new WizardTower(this.towers[gridx][gridy].x, 
                                        this.towers[gridx][gridy].y, 
                                        this.projectiles, 
                                        this.enemies);
                }
            }
        }
        
        // If not in Buy-Mode checks attack cooldown
        else if (this.atkcooldown == 0) {
            if (input.mouse.down) {
                this.projectiles.push(
                    new PlayerProjectile(this.x, this.y, input.mouse.x, input.mouse.y, this.enemies));
                this.atkcooldown = 180;
            }
        }
        else {
            this.atkcooldown--;
        }
        
        // Toggles Buy-Mode on and off
        if (input.keys.includes('t')) {
            this.bmode = !this.bmode;
            for (const x of this.towers) {
                for (const y of x) {
                    y.bmode = this.bmode;
                }
            }
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
         || !this.towers[gridx][gridy].tangible) {

            this.x = x;
            this.y = y;

            if (this.x < 0) this.x = 0;
            if (this.x > this.gameWidth) this.x = this.gameWidth;
            if (this.y < 0) this.y = 0;
            if (this.y > this.gameHeight) this.y = this.gameHeight;
        }
    }
}