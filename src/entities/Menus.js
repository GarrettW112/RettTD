import { WizardTower } from './Tower.js'
import { Wall } from './Tower.js'

const towerSprite = new Image();
towerSprite.src = 'src/assets/tower1.png';
const wallSprite = new Image();
wallSprite.src = 'src/assets/wall.png';

const WIDTH = 50;
const HEIGHT = 50;

export class Menus {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.esc = false;
        this.etoggle = true;
        this.bmode = false;
        this.bmenu = false;
        this.highlight = false;
        this.buyx = 0;
        this.buyy = 0;
        this.stime = performance.now();
        this.second = 0;
        this.dflag = false;
        this.wflag = false;
        this.tstring = "00:00";
        this.gold = 50;
    }

    draw(ctx) {
        ctx.font = "20px Arial";
        ctx.fillStyle = "black";
        ctx.textAlign = "right";
        ctx.fillText(this.tstring, this.width - 30, 30);

        if (this.highlight) {
                ctx.fillStyle = "rgba(255, 217, 0, 0.49)";
                ctx.fillRect((50 * (this.gridx + 2)) + 1, (50 * (this.gridy + 2)) + 1, WIDTH - 3, HEIGHT - 3);
        }

        if (this.dflag || this.wflag) {
            const boxWidth = 300;
            const boxHeight = 100;
            
            const x = (this.width - boxWidth) / 2;
            const y = (this.height - boxHeight) / 2;

            ctx.fillStyle = "rgba(0, 0, 0, 0.6)"; 
            ctx.fillRect(x, y, boxWidth, boxHeight);

            ctx.fillStyle = "red";
            ctx.font = "bold 44px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            if (this.dflag) {
                ctx.fillStyle = "red";
                ctx.fillText("YOU DIED...", this.width / 2, this.height / 2 + 4);
            }
            else {
                ctx.fillStyle = "green";
                ctx.fillText("YOU WIN!", this.width / 2, this.height / 2 + 4);
            }
        }

        else if (this.esc) {
            const boxWidth = 250;
            const boxHeight = 100;
            
            const x = (this.width - boxWidth) / 2;
            const y = (this.height - boxHeight) / 2;

            ctx.fillStyle = "rgba(0, 0, 0, 0.6)"; 
            ctx.fillRect(x, y, boxWidth, boxHeight);

            ctx.fillStyle = "white";
            ctx.font = "bold 44px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            
            ctx.fillText("PAUSED", this.width / 2, this.height / 2 + 4);
        }

        else if (this.bmenu) {

            ctx.fillStyle = "rgba(255, 217, 0, 0.7)";
            ctx.fillRect((50 * (this.buyx + 2)) + 1, (50 * (this.buyy+2)) + 1, WIDTH - 3, HEIGHT - 3);
            

            const boxWidth = 450;
            const boxHeight = 75;
            
            const x = (0);
            const y = (0);

            ctx.fillStyle = "rgba(255, 255, 255, 0.6)"; 
            ctx.fillRect(x, y, boxWidth, boxHeight);

            ctx.drawImage(
                towerSprite,
                5,
                5,
                WIDTH,
                HEIGHT
                );
            
            ctx.drawImage(
                wallSprite,
                60,
                5,
                WIDTH,
                HEIGHT
                );
        }

        else {}
    }

    update(input, player, towers, magic, projectiles, enemies) {

        if (player.hp <= 0) {
            this.dflag = true;
        }

        if (this.second > 20 && enemies.length == 0) {
            this.wflag = true;
        }

        if (!this.dflag && !this.wflag) {

            if (this.etoggle && input.keys.includes('Escape')) {
                this.esc = !this.esc;
                this.etoggle = false;
            }

            if (!input.keys.includes('Escape')) {
                this.etoggle = true;
            }

            if (!this.esc) {
                const elapsedMS = performance.now() - this.stime;
                const totalSeconds = Math.floor(elapsedMS / 1000);

                if (totalSeconds != this.second) {
                    this.second = totalSeconds;
                    
                    const minutes = Math.floor(totalSeconds / 60);
                    const seconds = totalSeconds % 60;
                    
                    const minStr = minutes.toString().padStart(2, '0');
                    const secStr = seconds.toString().padStart(2, '0');
                    
                    this.tstring = `${minStr}:${secStr}`;
                }

                if (this.bmode) {

                    this.gridx = Math.floor(input.mouse.x/50) - 2;
                    this.gridy = Math.floor(input.mouse.y/50) - 2;

                    if (0 <= this.gridx && this.gridx <= 7 && 0 <= this.gridy && this.gridy <= 7) {
                        this.highlight = true;
                        if (input.mouse.down) {
                            this.buyx = this.gridx;
                            this.buyy = this.gridy;
                            this.bmenu = true;
                        }
                    }
                    else {
                        this.highlight = false;
                    }

                    if (this.bmenu) {
                        if (input.mouse.down) {
                            if (5 <= input.mouse.y && input.mouse.y <= 55) {
                                if (5 <= input.mouse.x && input.mouse.x <= 55) {
                                    towers[this.buyx][this.buyy] = 
                                        new WizardTower(
                                            towers[this.buyx][this.buyy].x, 
                                            towers[this.buyx][this.buyy].y, 
                                            projectiles, 
                                            enemies
                                        );
                                    magic.push(towers[this.buyx][this.buyy]);
                                    this.bmenu = false;
                                }
                                if (60 <= input.mouse.x && input.mouse.x <= 110) {
                                    towers[this.buyx][this.buyy] = 
                                        new Wall(
                                            towers[this.buyx][this.buyy].x, 
                                            towers[this.buyx][this.buyy].y, 
                                            projectiles, 
                                            enemies
                                        );
                                        this.bmenu = false;
                                }
                            }
                        }
                    }
                }

                if (this.btoggle && input.keys.includes('t')) {
                    this.bmode = !this.bmode;
                    this.highlight = false;
                    if (this.bmode == false) {
                        this.bmenu = false;
                    }
                    this.btoggle = false
                    player.bmode = this.bmode;
                    for (const x of towers) {
                        for (const y of x) {
                            y.bmode = this.bmode;
                        }
                    }
                }
                if (!input.keys.includes('t')) {
                    this.btoggle = true;
                }
            }
        }
    }
}