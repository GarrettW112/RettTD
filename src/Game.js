import { Player } from './entities/Player.js';
import { Enemy } from './entities/Enemy.js';
import { Tower } from './entities/Tower.js';
import { InputHandler } from './Input.js';

export class Game {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.time = 0
        this.player = new Player(this.width, this.height);
        this.enemies = [];
        this.tower = new Tower(this.width, this.height);
        this.projectiles = [];
        this.input = new InputHandler();
    }

    update() {
        this.player.update(this.input);
        for (const z of this.enemies) {
            z.update();
        }
        this.tower.update(this.enemies, this.projectiles);
        this.projectiles = this.projectiles.filter(z => z.flag == 0);
        for (const z of this.projectiles) {
            z.update();
        }
    }

    Environment() {
        if (this.time == 0) {
            this.enemies.push(new Enemy(this.width, this.height, 0, 0))
        }
        for (x of 1 + Math.floor(this.time/100)) {
            if (Math.floor(Math.random() * 401) == 100) {
                this.enemies.push(new Enemy(this.width, this.height, Math.floor(Math.random() * 801), 0))
            }
            if (Math.floor(Math.random() * 401) == 200) {
                this.enemies.push(new Enemy(this.width, this.height, Math.floor(Math.random() * 801), 800))
            }
            if (Math.floor(Math.random() * 401) == 300) {
                this.enemies.push(new Enemy(this.width, this.height, 0, Math.floor(Math.random() * 801)))
            }
            if (Math.floor(Math.random() * 401) == 400) {
                this.enemies.push(new Enemy(this.width, this.height, 800, Math.floor(Math.random() * 801)))
            }
        }
        this.time += 1
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
        this.tower.draw(context);
        for (const z of this.projectiles) {
            z.draw(context);
        }
    }
}