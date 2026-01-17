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
        this.speed = 3;
        this.dashcd = 0;
        this.mana = 100;
        this.tpush = false;
        this.qdown = false;
        this.tpull = false;
        this.edown = false;
        this.tstun = false;
        this.fdown = false;
        this.tslow = false;
        this.rdown = false;
        this.atkcd = 0;
        this.bmode = true;
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
        
        // If not in Buy-Mode
        if (!this.bmode) {

            // Toggles Push
            if (!this.qdown) {
                if (input.keys.includes('q')) {
                    this.tpush = !this.tpush;
                    this.qdown = true;
                }
            }

            else if (!input.keys.includes('q')) {
                this.qdown = false;
            }



            // Toggles Pull
            if (!this.edown) {
                if (input.keys.includes('e')) {
                    this.tpull = !this.tpull;
                    this.edown = true;
                }
            }

            else if (!input.keys.includes('e')) {
                this.edown = false;
            }

            // Toggles Stun
            if (!this.fdown) {
                if (input.keys.includes('f')) {
                    this.fstun = !this.fstun;
                    this.fdown = true;
                }
            }

            else if (!input.keys.includes('f')) {
                this.fdown = false;
            }

            // Toggles Slow
            if (!this.rdown) {
                if (input.keys.includes('r')) {
                    this.tslow = !this.tslow;
                    this.rdown = true;
                }
            }

            else if (!input.keys.includes('r')) {
                this.rdown = false;
            }

            if (this.atkcd == 0) {
                if (input.mouse.down) {

                    const xdiff = input.mouse.x - this.x;
                    const ydiff = input.mouse.y - this.y;
                    const xrat = xdiff / Math.sqrt(xdiff**2 + ydiff**2);
                    const yrat = ydiff / Math.sqrt(xdiff**2 + ydiff**2);
                    projectiles.push(
                        new PlayerProjectile(this.x, this.y, xrat, yrat, this.tpush, this.tpull, this.tstun, this.tslow));
                    this.mana -= 1;
                    if (this.tpush) {
                        this.mana -= 1;
                    }
                    if (this.tpull) {
                        this.mana -= .5;
                    }
                    if (this.tstun) {
                        this.mana -= 4;
                    }
                    if (this.tslow) {
                        this.mana -= 2;
                    }
                    this.atkcd = 30;
                }
            }

            else {
                this.atkcd--;
            }
        }
    

        // Creates new x and y position based on user input
        let x = this.x;
        let y = this.y;
        
        if (this.dashcd == 0) {
            if (input.keys.includes(' ')) {
                if (input.keys.includes('d') || input.keys.includes('ArrowRight')) {
                    x += 200;
                }

                if (input.keys.includes('a') || input.keys.includes('ArrowLeft')) {
                    x -= 200;
                }

                if (input.keys.includes('w') || input.keys.includes('ArrowUp')) {
                    y -= 200;
                }

                if (input.keys.includes('s') || input.keys.includes('ArrowDown')) {
                    y += 200;
                }
                this.dashcd = 30;
            }
        }

        else {
            this.dashcd--;
        }

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
        if (0 >= gridx || gridx >= 7 || 0 >= gridy || gridy >= 7
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

        if (this.mana < 100) {
            this.mana += .017;
        }
    }
}
// Special Attacks/Upgrades:
// Stunning Stike -> Divine Bolt -> Time Stop
// Magnetic Blast -> Black Hole -> Purple
// Repelling Blast -> Repulsor -> Purple
// Frost Lance -> Blizzard -> Time Stop
// Dash -> Teleport -> Global Teleport