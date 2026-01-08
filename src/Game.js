import { Menus } from './entities/Menus.js';
import { Player } from './entities/Player.js';
import { Environment } from './entities/Environment.js';
import { Tower } from './entities/Tower.js';
import { InputHandler } from './Input.js';

export class Game {
    constructor(canvas) {
        this.width = canvas.width;
        this.height = canvas.height;
        this.environment = new Environment(this.width, this.height);
        this.projectiles = [];
        this.enemies = [];
        this.towers = [];
        for (let x = 125; x <= 475; x += 50) {
            let temp = [];
            for (let y = 125; y <= 475; y += 50) {
                temp.push(new Tower(x, y, false));
            }
            this.towers.push(temp);
        }
        this.player = new Player(this.width, this.height, this.menus, this.towers, this.enemies, this.projectiles);
        this.magic = [];
        this.menus = new Menus(this.width, this.height);
        this.input = new InputHandler(canvas);
    }

    update() {
        this.menus.update(this.input, this.player, this.towers, this.magic, this.enemies);

        if (!this.menus.dflag && !this.menus.wflag && !this.menus.esc) {

            if (this.menus.envactive) {

                this.environment.update(this.enemies);
            }

            this.player.update(this.input, this.towers, this.projectiles, this.enemies);

            let keepIndex = 0;
            for (const enemy of this.enemies) {
                if (enemy.flag == 0) {
                    this.enemies[keepIndex] = enemy;
                    keepIndex++;
                }
                else {
                    this.menus.gold++;
                }
            }
            this.enemies.length = keepIndex;

            for (const z of this.enemies) {
                z.update(this.player, this.towers, this.magic);
            }

            for (const x of this.towers) {
                for (const y of x) {
                    y.update(this.projectiles, this.enemies);
                }
            }

            keepIndex = 0;
            for (const item of this.magic) {
                if (item.hp > 0) {
                    this.magic[keepIndex] = item;
                    keepIndex++;
                }
            }
            this.magic.length = keepIndex;

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