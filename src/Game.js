import { Player } from './entities/Player.js';
import { Enemy } from './entities/Enemy.js';
import { Tower } from './entities/Tower.js'
import { InputHandler } from './Input.js';

export class Game {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.time = 0;
        this.towers = [];
        for (let x = 125; x <= 475; x += 50) {
            let temp = [];
            for (let y = 125; y <= 475; y += 50) {
                temp.push(new Tower(x, y));
            }
            this.towers.push(temp);
        }
        this.player = new Player(this.width, this.height, this.towers);
        this.enemies = [];
        this.projectiles = [];
        this.input = new InputHandler();
    }

    update() {
        this.player.update(this.input);
        this.enemies = this.enemies.filter(z => z.flag == 0);
        for (const z of this.enemies) {
            z.update();
        }
        for (const x of this.towers) {
            for (const y of x) {
                y.update(this.enemies, this.projectiles);
            }
        }
        this.projectiles = this.projectiles.filter(z => z.flag == 0);
        for (const z of this.projectiles) {
            z.update();
        }
    }

    environment() {
        for (let x = 0; x < 1 + Math.floor(this.time/1000); x++) {
            let rand = Math.floor(Math.random() * 400)
            if (rand == 99) {
                this.enemies.push(new Enemy(Math.floor(Math.random() * this.width), 0, this.player));
            }
            if (rand == 199) {
                this.enemies.push(new Enemy(Math.floor(Math.random() * this.width), this.height, this.player));
            }
            if (rand == 299) {
                this.enemies.push(new Enemy(0, Math.floor(Math.random() * this.height), this.player));
            }
            if (rand == 399) {
                this.enemies.push(new Enemy(this.width, Math.floor(Math.random() * this.height), this.player));
            }
        }
        this.time++;
    }

    draw(context) {
        this.player.draw(context);
        for (const z of this.enemies) {
            if (z.hp > 0) {
                z.draw(context);
            }
            else {
                z.death;
            }
        }
        for (const x of this.towers) {
            for (const y of x) {
                y.draw(context);
            }
        }
        for (const z of this.projectiles) {
            z.draw(context);
        }
    }
}