import { Menus } from './entities/Menus.js';
import { Player } from './entities/Player.js';
import { Enemy } from './entities/Enemy.js';
import { Tower } from './entities/Tower.js'
import { InputHandler } from './Input.js';

export class Game {
    constructor(canvas) {
        this.width = canvas.width;
        this.height = canvas.height;
        this.envtime = 1;
        this.menus = new Menus(this.width, this.height);
        this.projectiles = [];
        this.enemies = [];
        this.towers = [];
        for (let x = 125; x <= 475; x += 50) {
            let temp = [];
            for (let y = 125; y <= 475; y += 50) {
                temp.push(new Tower(x, y, 1, false, false));
            }
            this.towers.push(temp);
        }
        this.player = new Player(this.width, this.height, this.menus, this.towers, this.enemies, this.projectiles);
        this.input = new InputHandler(canvas);
    }

    update() {
        this.menus.update(this.input, this.player, this.towers, this.projectiles, this.enemies);

        if (!this.menus.dflag && !this.menus.wflag) {
            if (!this.menus.esc) {

                this.player.update(this.input, this.towers, this.projectiles, this.enemies);

                let keepIndex = 0;
                for (const enemy of this.enemies) {
                    if (enemy.flag == 0) {
                        this.enemies[keepIndex] = enemy;
                        keepIndex++;
                    }
                    else {
                        this.player.gold++;
                    }
                }
                this.enemies.length = keepIndex;

                for (const z of this.enemies) {
                    z.update(this.player, this.towers);
                }

                for (const x of this.towers) {
                    for (const y of x) {
                        y.update(this.projectiles, this.enemies);
                    }
                }

                keepIndex = 0;
                for (const projectile of this.projectiles) {
                    if (projectile.flag == 0) {
                        this.projectiles[keepIndex] = projectile;
                        keepIndex++;
                    }
                }

                this.projectiles.length = keepIndex;
                for (const z of this.projectiles) {
                    z.update(this.enemies);
                }
            }
        }
    }

    environment() {
        if (!this.menus.dflag && !this.menus.wflag) {
            if (!this.menus.esc) {
                if (this.envtime % 60 == 0 && this.envtime < 1202) {
                    let rand = Math.floor(Math.random() * 4)
                    if (rand == 0) {
                        this.enemies.push(new Enemy(Math.floor(Math.random() * this.width), 0, this.player, this.towers));
                    }
                    if (rand == 1) {
                        this.enemies.push(new Enemy(Math.floor(Math.random() * this.width), this.height, this.player, this.towers));
                    }
                    if (rand == 2) {
                        this.enemies.push(new Enemy(0, Math.floor(Math.random() * this.height), this.player, this.towers));
                    }
                    if (rand == 3) {
                        this.enemies.push(new Enemy(this.width, Math.floor(Math.random() * this.height), this.player, this.towers));
                    }
                }
                this.envtime++;
            }
        }
    }

    draw(context) {

        this.player.draw(context);

        for (const z of this.enemies) {
            z.draw(context);
        }

        for (const x of this.towers) {
            for (const y of x) {
                y.draw(context);
            }
        }

        for (const z of this.projectiles) {
            z.draw(context);
        }

        this.menus.draw(context);
    }
}